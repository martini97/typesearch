# typesearch

[![ci](https://github.com/martini97/typesearch/actions/workflows/ci.yml/badge.svg)](https://github.com/martini97/typesearch/actions/workflows/ci.yml)

Integration between typeorm and elasticsearch.

> [!WARNING]
> This is highly experimental and under construction, there are no guarantees that it
> works or that it will continue to work.

## roadmap

- [ ] generate index json from typeorm entity
- [ ] handle nested & object fields
- [ ] implement query builder with support to both typeorm & elasticsearch
  + [ ] implement query dsl for said query builder

## usage

Currently, only the metadata collection and index builder have been built, you can use it as:

```typescript
import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";
import { Client } from '@elastic/elasticsearch';
import { SearchEntity, SearchField, getIndexBuilder } from "typesearch";

@SearchEntity({ name: "claz-index", settings: { number_of_replicas: 2 } })
@Entity()
class Claz {
  @SearchField()
  @PrimaryColumn()
  public id!: string;

  @SearchField()
  @Column()
  public name!: string;

  @SearchField({ name: "created_at", mapping: { format: "yyyy-MM-dd" } })
  @CreateDateColumn()
  public createdAt!: Date;

  @SearchField({ name: "updated_at" })
  @UpdateDateColumn()
  public updatedAt?: Date;
}

const client = new Client(/* ... */);
const index = getIndexBuilder().build(Claz);
const result = client.indices
  .create(payload)
  .then(result => console.log(`Created index: ${result}`)
  .catch(err => console.error(`Failed to create index: ${err}`);
```
