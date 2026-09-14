declare module "pg" {
  export type QueryResultRow = Record<string, any>

  export interface QueryResult<Row extends QueryResultRow = QueryResultRow> {
    rows: Row[]
    rowCount: number | null
  }

  export interface PoolConfig {
    connectionString?: string
    ssl?: boolean | { rejectUnauthorized?: boolean }
  }

  export class Pool {
    constructor(config?: PoolConfig)
    query<Row extends QueryResultRow = QueryResultRow>(
      text: string,
      values?: readonly unknown[],
    ): Promise<QueryResult<Row>>
    end(): Promise<void>
  }
}
