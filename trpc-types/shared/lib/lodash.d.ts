export declare const _: {
    throttle: {
        <T extends (...args: any) => any>(func: T, wait?: number, options?: import("lodash").ThrottleSettingsLeading): import("lodash").DebouncedFuncLeading<T>;
        <T extends (...args: any) => any>(func: T, wait?: number, options?: import("lodash").ThrottleSettings): import("lodash").DebouncedFunc<T>;
    };
    debounce: {
        <T extends (...args: any) => any>(func: T, wait: number | undefined, options: import("lodash").DebounceSettingsLeading): import("lodash").DebouncedFuncLeading<T>;
        <T extends (...args: any) => any>(func: T, wait?: number, options?: import("lodash").DebounceSettings): import("lodash").DebouncedFunc<T>;
    };
    each: {
        <T>(collection: T[], iteratee?: import("lodash").ArrayIterator<T, any>): T[];
        (collection: string, iteratee?: import("lodash").StringIterator<any>): string;
        <T>(collection: import("lodash").List<T>, iteratee?: import("lodash").ListIterator<T, any>): import("lodash").List<T>;
        <T extends object>(collection: T, iteratee?: import("lodash").ObjectIterator<T, any>): T;
        <T, TArray extends T[] | null | undefined>(collection: TArray & (T[] | null | undefined), iteratee?: import("lodash").ArrayIterator<T, any>): TArray;
        <TString extends string | null | undefined>(collection: TString, iteratee?: import("lodash").StringIterator<any>): TString;
        <T, TList extends import("lodash").List<T> | null | undefined>(collection: TList & (import("lodash").List<T> | null | undefined), iteratee?: import("lodash").ListIterator<T, any>): TList;
        <T extends object>(collection: T | null | undefined, iteratee?: import("lodash").ObjectIterator<T, any>): T | null | undefined;
    };
    flattenDeep: <T>(array: import("lodash").ListOfRecursiveArraysOrValues<T> | null | undefined) => Array<import("lodash").Flat<T>>;
    omitBy: {
        <T>(object: import("lodash").Dictionary<T> | null | undefined, predicate?: import("lodash").ValueKeyIteratee<T>): import("lodash").Dictionary<T>;
        <T>(object: import("lodash").NumericDictionary<T> | null | undefined, predicate?: import("lodash").ValueKeyIteratee<T>): import("lodash").NumericDictionary<T>;
        <T extends object>(object: T | null | undefined, predicate: import("lodash").ValueKeyIteratee<T[keyof T]>): import("lodash").PartialObject<T>;
    };
    isNil: (value: any) => value is null | undefined;
    keyBy: {
        <T>(collection: import("lodash").List<T> | null | undefined, iteratee?: import("lodash").ValueIterateeCustom<T, import("lodash").PropertyName>): import("lodash").Dictionary<T>;
        <T extends object>(collection: T | null | undefined, iteratee?: import("lodash").ValueIterateeCustom<T[keyof T], import("lodash").PropertyName>): import("lodash").Dictionary<T[keyof T]>;
    };
    mergeWith: {
        <TObject, TSource>(object: TObject, source: TSource, customizer: import("lodash").MergeWithCustomizer): TObject & TSource;
        <TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2, customizer: import("lodash").MergeWithCustomizer): TObject & TSource1 & TSource2;
        <TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, customizer: import("lodash").MergeWithCustomizer): TObject & TSource1 & TSource2 & TSource3;
        <TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4, customizer: import("lodash").MergeWithCustomizer): TObject & TSource1 & TSource2 & TSource3 & TSource4;
        (object: any, ...otherArgs: any[]): any;
    };
    cloneDeep: <T>(value: T) => T;
    groupBy: {
        <T>(collection: import("lodash").List<T> | null | undefined, iteratee?: import("lodash").ValueIteratee<T>): import("lodash").Dictionary<T[]>;
        <T extends object>(collection: T | null | undefined, iteratee?: import("lodash").ValueIteratee<T[keyof T]>): import("lodash").Dictionary<Array<T[keyof T]>>;
    };
    get: {
        <TObject extends object, TKey extends keyof TObject>(object: TObject, path: TKey | [TKey]): TObject[TKey];
        <TObject extends object, TKey extends keyof TObject>(object: TObject | null | undefined, path: TKey | [TKey]): TObject[TKey] | undefined;
        <TObject extends object, TKey extends keyof TObject, TDefault>(object: TObject | null | undefined, path: TKey | [TKey], defaultValue: TDefault): Exclude<TObject[TKey], undefined> | TDefault;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1]>(object: TObject, path: [TKey1, TKey2]): TObject[TKey1][TKey2];
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>>(object: TObject | null | undefined, path: [TKey1, TKey2]): NonNullable<TObject[TKey1]>[TKey2] | undefined;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>, TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2], defaultValue: TDefault): Exclude<NonNullable<TObject[TKey1]>[TKey2], undefined> | TDefault;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2]>(object: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3];
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>, TKey3 extends keyof NonNullable<NonNullable<TObject[TKey1]>[TKey2]>>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3]): NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3] | undefined;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>, TKey3 extends keyof NonNullable<NonNullable<TObject[TKey1]>[TKey2]>, TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3], defaultValue: TDefault): Exclude<NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3], undefined> | TDefault;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof TObject[TKey1], TKey3 extends keyof TObject[TKey1][TKey2], TKey4 extends keyof TObject[TKey1][TKey2][TKey3]>(object: TObject, path: [TKey1, TKey2, TKey3, TKey4]): TObject[TKey1][TKey2][TKey3][TKey4];
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>, TKey3 extends keyof NonNullable<NonNullable<TObject[TKey1]>[TKey2]>, TKey4 extends keyof NonNullable<NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3]>>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3, TKey4]): NonNullable<NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3]>[TKey4] | undefined;
        <TObject extends object, TKey1 extends keyof TObject, TKey2 extends keyof NonNullable<TObject[TKey1]>, TKey3 extends keyof NonNullable<NonNullable<TObject[TKey1]>[TKey2]>, TKey4 extends keyof NonNullable<NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3]>, TDefault>(object: TObject | null | undefined, path: [TKey1, TKey2, TKey3, TKey4], defaultValue: TDefault): Exclude<NonNullable<NonNullable<NonNullable<TObject[TKey1]>[TKey2]>[TKey3]>[TKey4], undefined> | TDefault;
        <T>(object: import("lodash").NumericDictionary<T>, path: number): T;
        <T>(object: import("lodash").NumericDictionary<T> | null | undefined, path: number): T | undefined;
        <T, TDefault>(object: import("lodash").NumericDictionary<T> | null | undefined, path: number, defaultValue: TDefault): T | TDefault;
        <TDefault>(object: null | undefined, path: import("lodash").PropertyPath, defaultValue: TDefault): TDefault;
        (object: null | undefined, path: import("lodash").PropertyPath): undefined;
        <TObject, TPath extends string>(data: TObject, path: TPath): string extends TPath ? any : import("lodash").GetFieldType<TObject, TPath>;
        <TObject, TPath extends string, TDefault = import("lodash").GetFieldType<TObject, TPath, "Path">>(data: TObject, path: TPath, defaultValue: TDefault): Exclude<import("lodash").GetFieldType<TObject, TPath>, null | undefined> | TDefault;
        (object: any, path: import("lodash").PropertyPath, defaultValue?: any): any;
    };
    set: {
        <T extends object>(object: T, path: import("lodash").PropertyPath, value: any): T;
        <TResult>(object: object, path: import("lodash").PropertyPath, value: any): TResult;
    };
    remove: <T>(array: import("lodash").List<T>, predicate?: import("lodash").ListIteratee<T>) => T[];
    merge: {
        <TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
        <TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;
        <TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3): TObject & TSource1 & TSource2 & TSource3;
        <TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4): TObject & TSource1 & TSource2 & TSource3 & TSource4;
        (object: any, ...otherArgs: any[]): any;
    };
    isEqual: (value: any, other: any) => boolean;
    uniqWith: <T>(array: import("lodash").List<T> | null | undefined, comparator?: import("lodash").Comparator<T>) => T[];
    orderBy: {
        <T>(collection: import("lodash").List<T> | null | undefined, iteratees?: import("lodash").Many<import("lodash").ListIterator<T, import("lodash").NotVoid>>, orders?: import("lodash").Many<boolean | "asc" | "desc">): T[];
        <T>(collection: import("lodash").List<T> | null | undefined, iteratees?: import("lodash").Many<import("lodash").ListIteratee<T>>, orders?: import("lodash").Many<boolean | "asc" | "desc">): T[];
        <T extends object>(collection: T | null | undefined, iteratees?: import("lodash").Many<import("lodash").ObjectIterator<T, import("lodash").NotVoid>>, orders?: import("lodash").Many<boolean | "asc" | "desc">): Array<T[keyof T]>;
        <T extends object>(collection: T | null | undefined, iteratees?: import("lodash").Many<import("lodash").ObjectIteratee<T>>, orders?: import("lodash").Many<boolean | "asc" | "desc">): Array<T[keyof T]>;
    };
    pick: {
        <T extends object, U extends keyof T>(object: T, ...props: Array<import("lodash").Many<U>>): Pick<T, U>;
        <T>(object: T | null | undefined, ...props: Array<import("lodash").Many<import("lodash").PropertyPath>>): import("lodash").PartialObject<T>;
    };
    difference: <T>(array: import("lodash").List<T> | null | undefined, ...values: Array<import("lodash").List<T>>) => T[];
    uniqBy: <T>(array: import("lodash").List<T> | null | undefined, iteratee: import("lodash").ValueIteratee<T>) => T[];
};
