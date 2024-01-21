import fs from 'fs/promises';
import path from 'path';
import type Item from './item';

const FsHelper = {
  getCurrentPathWithSegments(segments: string[]): string {
    return path.resolve(process.cwd(), 'src/app/cs-stuff', ...segments);
  },
  isMdxPageFile(filePath: string): boolean {
    return path.basename(filePath) === 'page.mdx';
  },
  async isDirectory(filePath: string): Promise<boolean> {
    return (await fs.lstat(filePath)).isDirectory();
  },
};

const ItemHelper = {
  createRootItem(): Item {
    return {
      name: 'root',
      hasContent: false,
      segments: [],
      children: [],
    };
  },
  createItem(name: string, parentSegments: string[]): Item {
    return {
      name,
      hasContent: false,
      segments: [...parentSegments, name],
      children: [],
    };
  },
};

class ItemContentBuilder {
  private readonly dirPath: string;
  constructor(private readonly item: Item, private readonly queue: Item[]) {
    this.dirPath = FsHelper.getCurrentPathWithSegments(item.segments);
  }

  private async checkHasContent(entryName: string) {
    this.item.hasContent ||= FsHelper.isMdxPageFile(entryName);
  }

  private async addChild(entryName: string) {
    const childItem = ItemHelper.createItem(entryName, this.item.segments);
    this.item.children.push(childItem);
    this.queue.push(childItem);
  }

  private buildForEntry = async (entryName: string) => {
    const entryPath = path.resolve(this.dirPath, entryName);
    if (await FsHelper.isDirectory(entryPath)) {
      await this.addChild(entryName);
    } else {
      await this.checkHasContent(entryName);
    }
  };

  async build() {
    const entryNames = await fs.readdir(this.dirPath);
    await Promise.all(entryNames.map(this.buildForEntry));
  }
}

export default async function getPostHierarchy() {
  const root = ItemHelper.createRootItem();
  const queue = [root];

  while (queue.length >= 1) {
    const item = queue.shift()!;
    const contentBuilder = new ItemContentBuilder(item, queue);
    await contentBuilder.build();
  }

  return root;
}
