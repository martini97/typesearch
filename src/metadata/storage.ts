import type { Class } from "src/common/class";

type EntityTarget = { name: string; target: Class<unknown> };

export class MetadataStorage {
  private readonly entities: EntityTarget[] = [];

  public getSearchEntities() {
    return this.entities;
  }

  public addSearchEntity(target: EntityTarget): void {
    this.entities.push({
      name: target.name,
      target: target.target,
    });
  }
}
