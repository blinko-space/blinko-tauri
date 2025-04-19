type BasicOperator = '$eq' | '$ne';
type NumericOperator = '$gt' | '$gte' | '$lt' | '$lte';
type LogicalOperator = '$and' | '$not' | '$nor' | '$or';
type ArrayOperator = '$all' | '$in' | '$nin' | '$elemMatch';
type ElementOperator = '$exists';
type RegexOperator = '$regex' | '$options';
type QueryOperator = BasicOperator | NumericOperator | LogicalOperator | ArrayOperator | ElementOperator | RegexOperator;
type OperatorCondition = {
    [K in QueryOperator]?: any;
};
type FieldCondition = OperatorCondition | any;
type VectorFilter = {
    [field: string]: FieldCondition | VectorFilter;
} | null | undefined;
type OperatorSupport = {
    logical?: LogicalOperator[];
    array?: ArrayOperator[];
    basic?: BasicOperator[];
    numeric?: NumericOperator[];
    element?: ElementOperator[];
    regex?: RegexOperator[];
    custom?: string[];
};
declare abstract class BaseFilterTranslator {
    abstract translate(filter: VectorFilter): unknown;
    /**
     * Operator type checks
     */
    protected isOperator(key: string): key is QueryOperator;
    protected static readonly BASIC_OPERATORS: BasicOperator[];
    protected static readonly NUMERIC_OPERATORS: NumericOperator[];
    protected static readonly ARRAY_OPERATORS: ArrayOperator[];
    protected static readonly LOGICAL_OPERATORS: LogicalOperator[];
    protected static readonly ELEMENT_OPERATORS: ElementOperator[];
    protected static readonly REGEX_OPERATORS: RegexOperator[];
    static readonly DEFAULT_OPERATORS: {
        logical: LogicalOperator[];
        basic: BasicOperator[];
        numeric: NumericOperator[];
        array: ArrayOperator[];
        element: "$exists"[];
        regex: RegexOperator[];
    };
    protected isLogicalOperator(key: string): key is LogicalOperator;
    protected isBasicOperator(key: string): key is BasicOperator;
    protected isNumericOperator(key: string): key is NumericOperator;
    protected isArrayOperator(key: string): key is ArrayOperator;
    protected isElementOperator(key: string): key is ElementOperator;
    protected isRegexOperator(key: string): key is RegexOperator;
    protected isFieldOperator(key: string): key is QueryOperator;
    protected isCustomOperator(key: string): boolean;
    protected getSupportedOperators(): OperatorSupport;
    protected isValidOperator(key: string): boolean;
    /**
     * Value normalization for comparison operators
     */
    protected normalizeComparisonValue(value: any): any;
    /**
     * Helper method to simulate $all operator using $and + $eq when needed.
     * Some vector stores don't support $all natively.
     */
    protected simulateAllOperator(field: string, values: any[]): VectorFilter;
    /**
     * Utility functions for type checking
     */
    protected isPrimitive(value: any): boolean;
    protected isRegex(value: any): boolean;
    protected isEmpty(obj: any): boolean;
    protected static readonly ErrorMessages: {
        readonly UNSUPPORTED_OPERATOR: (op: string) => string;
        readonly INVALID_LOGICAL_OPERATOR_LOCATION: (op: string, path: string) => string;
        readonly NOT_REQUIRES_OBJECT: "$not operator requires an object";
        readonly NOT_CANNOT_BE_EMPTY: "$not operator cannot be empty";
        readonly INVALID_LOGICAL_OPERATOR_CONTENT: (path: string) => string;
        readonly INVALID_TOP_LEVEL_OPERATOR: (op: string) => string;
        readonly ELEM_MATCH_REQUIRES_OBJECT: "$elemMatch requires an object with conditions";
    };
    /**
     * Helper to handle array value normalization consistently
     */
    protected normalizeArrayValues(values: any[]): any[];
    protected validateFilter(filter: VectorFilter): void;
    /**
     * Validates if a filter structure is supported by the specific vector DB
     * and returns detailed validation information.
     */
    private validateFilterSupport;
}
export { type QueryOperator, type BasicOperator, type NumericOperator, type LogicalOperator, type ArrayOperator, type RegexOperator, type ElementOperator, type VectorFilter, type FieldCondition, type OperatorCondition, type OperatorSupport, BaseFilterTranslator, };
/**
 * Translates MongoDB-style filters to LibSQL compatible filters.
 *
 * Key differences from MongoDB:
 *
 * Logical Operators ($and, $or, $nor):
 * - Can be used at the top level or nested within fields
 * - Can take either a single condition or an array of conditions
 *
 */
export declare class LibSQLFilterTranslator extends BaseFilterTranslator {
    protected getSupportedOperators(): OperatorSupport;
    translate(filter?: VectorFilter): VectorFilter;
    private translateNode;
}
