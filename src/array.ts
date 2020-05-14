import {isArray, isAssociative, isEmpty, isNumber} from './predicate';
import {first, rest, take} from './list';
import {identity} from './core';
import {Associative} from './type';
import {values} from './associative';

export const flatMap = <A, B>(f: (_: A) => Array<B>) =>
    (as: Array<A>): Array<B> =>
        (as.length < 1
            ? []
            : as.reduce(intoArrayWith(f as any),[])) as unknown as Array<B>;


// TODO move to associative package
export function flatten<U, T extends Array<U>>(as: Associative<T>): T;
export function flatten<U, T extends Array<U>>(as: Associative<T>, depth: 1): T;
export function flatten<U, T extends Array<U>>(as: Array<T>, depth: number): T;
export function flatten<T>(as: Array<T>, depth: number): Array<any>;
export function flatten(depth: void): <U, T extends Array<U>>(as: Associative<T>) => T;
export function flatten(depth: 1): <U, T extends Array<U>>(as: Associative<T>) => T;
export function flatten(depth: number): <T,R>(as: Array<T>) => Array<R>;
// export function flatten<T>(as: Associative<T>): Array<T>;
export function flatten(p1: any, ...p2: any[]): any {

    const _flatten = flatMap(identity as any) as any;

    const inner = (num: number) =>
         (as: Array<any>) =>
            num === 1 || num === undefined
                ? _flatten(values(as))
                : flatten(num - 1)(_flatten(as))

    return p2.length === 0
        ? isNumber(p1)
            ? inner(p1)
            : p1 === undefined
                ? inner(1)
                : inner(1)(p1)
        : inner(p2[0])(p1)
}


const intoArrayWith = <A>(f: (_: A) => Array<A>) =>
    (acc: Array<A>, val: A) => acc.concat(f(val));


/**
 * see https://mail.mozilla.org/pipermail/es-discuss/2012-April/022273.html
 */
export function dense(size: number) {

    return Array.apply(null, Array(size))
}


export function range(a: number, b?: number, stepSize: number = 1): number[] {

    let begin: number|undefined = undefined;
    let end:   number|undefined = undefined;

    if (b === undefined) {
        end = a;
        begin = 0;
    } else {
        begin = a;
        end   = b;
    }
    const numItems = (end - begin) / stepSize;

    return dense(numItems)
        .map((a: any, i: number) => (begin as number) + (i * stepSize));
}


export function zipWith<A,B,C> (f: (a: A, b: B) => C, as: Array<A>) {

    return (bs: Array<B>): Array<C> => {

        const minimumLength = Math.min(as.length, bs.length);
        const _as = take(minimumLength)(as);
        const _bs = take(minimumLength)(bs);

        const zipped: Array<C> = [];
        for (let i = 0; i < minimumLength; i++) {
            zipped.push(f((_as as any)[i] as A, (_bs as any)[i] as B));
        }
        return zipped;
    }
}


export function reduce1<T>(f: (b: T, t: T, i?: number) => T) {

    return (ts: Array<T>): T => {

        if (isArray(ts) && !isEmpty(ts)) {

            let acc: T = first(ts) as T;
            let i = 0;
            for (let a of rest(ts)) {
                acc = f(acc, a, i);
                i++;
            }
            return acc;

        } else {

            throw "illegal argument - must be array or object"
        }
    };
}