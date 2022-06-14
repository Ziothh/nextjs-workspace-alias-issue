/** A helper type to define tuples. 
 * @param T the type of the tuple 
 * @param N the amount of items inside the tuple
 */
type Tuple<T, N extends number> = N extends N 
    ? number extends N 
        ? T[] 
        : _TupleOf<T, N, []> 
    : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N 
    ? R 
    : _TupleOf<T, N, [T, ...R]>;