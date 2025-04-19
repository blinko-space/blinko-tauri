import type { InValue } from '@libsql/client';
import type { BasicOperator, NumericOperator, ArrayOperator, ElementOperator, LogicalOperator, RegexOperator, VectorFilter } from './filter';
export type OperatorType = BasicOperator | NumericOperator | ArrayOperator | ElementOperator | LogicalOperator | '$contains' | Exclude<RegexOperator, '$options'>;
type FilterOperator = {
    sql: string;
    needsValue: boolean;
    transformValue?: (value: any) => any;
};
type OperatorFn = (key: string, value?: any) => FilterOperator;
export declare const FILTER_OPERATORS: Record<string, OperatorFn>;
export interface FilterResult {
    sql: string;
    values: InValue[];
}
export declare const handleKey: (key: string) => string;
export declare function buildFilterQuery(filter: VectorFilter): FilterResult;
export {};
