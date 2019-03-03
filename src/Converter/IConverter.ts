export interface IConverter<T, U> {
    convert(source: T): U;
}