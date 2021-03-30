import {Array2, Mapping, Path, Map, Key} from './type'
import {isArray, isArray2, isAssociative, isFunction, isKey, isNumber, isPrimitive, isString} from './predicate'
import {throwIllegalArgs} from './core'
import {copy, map} from './associative'
import {rest} from './array'


// ------------ @author Daniel de Oliveira -----------------

/**
 * tsfun | clone
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/clone.spec.ts
 */
export function clone(struct: boolean): boolean
export function clone(struct: string): string
export function clone(struct: number): number
export function clone(struct: undefined): undefined
export function clone(struct: null): null
export function clone<T>(struct: Array<T>): Array<T>
export function clone<T>(struct: Map<T>): Map<T>
export function clone(struct) {

    return isPrimitive(struct)
        ? struct
        : isAssociative(struct)
        ? map(struct, clone)
        : throwIllegalArgs('clone', 'Primitive or Associative', struct)
}


/**
 * tsfun | to
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/to.spec.ts
 */
export function to<T = any>(path: Array2<Key>|Key, alternative?: any): {
    (t: Array<any>): T
    (t: Map<any>): T
}
export function to(path: Path, alternative?) {

    return !isKey(path)
        ? throwIllegalArgs('to', 'Array of at least 2 or string or number', path)
        : ds => {
            const result = (isString(path) || isNumber(path))
                ? ds[path]
                : $getElForPathIn(ds as Object, path as any)

            return result !== undefined ? result : alternative
        }
}


/**
 * tsfun | update
 * https://github.com/danielmarreirosdeoliveira/tsfun/blob/master/test/struct/update.spec.ts
 */
export function update<T, K extends keyof T>(k: K, f: (val: T[K])=>T[K], o: T): T
export function update<T, K extends keyof T,V>(k: K, f: (val: T[K])=>V, o: T): unknown
export function update<T, K extends keyof T>(k: K, val: T[K], o: T): T
export function update<T, K extends keyof T, V>(k: K, val: V, o: T): unknown

export function update<V>(k: string, f: Mapping<V>): <T>(o: T) => T
export function update<T, K extends keyof T,V>(k: K, f: (val: T[K])=>V): (o: T) => unknown
export function update<V>(k: string, val: V): (o: any) => unknown
export function update<T, K extends keyof T, V>(k: K, val: V): (o: T) => unknown

export function update<V,T>(k: number, f: Mapping<V>, o: T): T
export function update<V,T>(k: number, v: V, o: T): unknown
export function update<V>(k: number, f: Mapping<V>): <T>(o: T) => T
export function update<V>(k: number, v: V): (o: any) => unknown

export function update<A,B,C>(k: 0, f: (a: A)=>B, o: [A, C]): [B, C]
export function update<A,B,C,D,E>(k: 0, f: (a: A)=>A, o: [D, C]): [E, C]
export function update<A,B,C>(k: 1, f: (a: A)=>B, o: [C, A]): [C, B]
export function update<A,B,C,D,E>(k: 1, f: (a: A)=>A, o: [C, D]): [C, D]
export function update<A,B,C>(k: 0, f: A, o: [B, C]): [A, C]
export function update<A,B,C>(k: 1, f: A, o: [B, C]): [B, A]

export function update<A,B>(k: 0, f: (a: A)=>A): <C>(o: C) => C
export function update<A,B>(k: 1, f: (a: A)=>A): <C>(o: C) => C
export function update<A,B>(k: 0, f: (a: A)=>B): <C>(o: [A, C]) => [B, C]
export function update<A,B>(k: 1, f: (a: A)=>B): <C>(o: [C, A]) => [C, B]
export function update<A>(k: 0, f: A): <B,C>(o: [B, C]) => [A, C]
export function update<A>(k: 1, f: A): <B,C>(o: [B, C]) => [B, A]

export function update<U, T>(k: Array2<string|number>, f: Mapping<U>, o: T): T
export function update(k: Array2<string|number>, v: any, o: any): unknown
export function update<U, T, V>(k: Array2<string|number>, f: ((val: U) => V)|V, o: T): unknown
export function update<U, T>(k: Array2<string|number>, f: U, o: T): T
export function update<T, V>(k: Array2<string|number>, f: (v: any) => any, t: T): V
export function update<U>(k: Array2<string|number>, f: Mapping<U>): <T,V extends T>(s: T) => V
export function update<U>(k: Array2<string|number>, f: U): (s: any) => unknown
export function update<U,V>(k: Array2<string|number>, f: ((val: U) => V)|V): (s: any) => unknown

// TODO review those
export function update<A,B,C,D,E>(k: [0, string|number], f: (a: A)=>B, o: [D, C]): [E, C]
export function update<A,B,C,D,E>(k: [1, string|number], f: (a: A)=>B, o: [C, D]): [C, E]
export function update<A,B,C>(k: [0, string|number], f: A, o: [B, C]): [A, C]
export function update<A,B,C>(k: [1, string|number], f: A, o: [B, C]): [B, A]
export function update<A,B>(k: [0, string|number], f: (a: A)=>B): <C,D,E>(o: [D, C]) => [E, C]
export function update<A,B>(k: [1, string|number], f: (a: A)=>B): <C,D,E>(o: [C, D]) => [C, E]
export function update<A>(k: [0, string|number], f: A): <B,C>(o: [B, C]) => [A, C]
export function update<A>(k: [1, string|number], f: A): <B,C>(o: [B, C]) => [B, A]

// TODO review those
export function update<T, V, K extends keyof T>(key: keyof T, v: any): <T1>(o: T1) => V
export function update<T, K extends keyof T>(key: keyof T, f: Mapping<T[K]>): <T1>(o: T1) => T1
export function update<T, V, K extends keyof T>(key: keyof T, f: Mapping<T[K]|any>): <T1>(o: T1) => V
export function update<U>(k: string, f: ((val: U) => U)|U): <T,V extends T>(s: T) => V

export function update(path, update_fun, o?) {

    const $ = struct => {

        if (isString(path) || isNumber(path)) {

            return $update0(path, update_fun, struct)

        } else if (isArray(path)) {

            if (path.length < 2) throw 'illegal argument - path must be at least be of length 2'
            return $update1(clone(path), struct, update_fun, true)

        } else {

            throw 'illegal argument - must be one of Array<string|number>, string, number'
        }
    }

    return o !== undefined
        ? $(o)
        : $
}


export function $dissoc<T>(key: any, as?: any): any {

    const $ = struct => {

        const newStruct = copy(struct as any)
        if (isArray(struct)) (newStruct as any).splice(key, 1)
        else delete (newStruct as any)[key]
        return newStruct
    }

    return as === undefined
        ? $
        : $(as)
}


export function dissoc(k: string): <T>(as: Map<T>) => Map<T>
export function dissoc(k: number): <T>(as: Array<T>) => Array<T>
export function dissoc(path: Array<string|number>): <T extends any, V extends any>(t: T) => V
export function dissoc(path: string|Array<string|number>): <T>(o: T) => T
export function dissoc<T>(k: string, m: Map<T>): Map<T>
export function dissoc<T>(k: string, as: Array<T>): Array<T>
export function dissoc<T>(path: string|number|Array<string|number>, o: T): unknown
export function dissoc(path, o?) {

    const $ = struct => {

        if (isString(path)||isNumber(path)) {

            if (isArray(struct)) return $dissoc(path, struct)

            const c = copy(struct)
            delete c[path]
            return c

        } else if (isArray(path)) {

            if (path.length < 1) throw 'illegal argument - array path should have min length 1'
            return $update1(clone(path), struct, undefined, false)

        } else {

            throw 'illegal argument - path expected to be one of array, number, string'
        }

    }

    return o === undefined
        ? $
        : $(o)
}


function $update0(key, f: any, o?) {

    const $ = o => {

        const c: any = copy(o as any)
        c[key] = isFunction(f) ? f(c[key]) : f
        return c
    }

    return o === undefined
        ? $
        : $(o)
}


function $update1(path_ /*mut inplace*/, struct, update_fun, update = true) {

    const pathSegments = path_ as Array<string|number>

    const pathSegment = pathSegments[0]
    const copied = copy(struct)

    if (pathSegments.length === 1) {
        if (update) {
            const updateFunResult =  isFunction(update_fun) ? update_fun(copied[pathSegment]) : update_fun
            copied[pathSegment] = isFunction(updateFunResult) ? updateFunResult() : updateFunResult
        }
        else delete copied[pathSegment]
    } else {
        pathSegments.shift()
        if (update || copied[pathSegment] !== undefined) {
            copied[pathSegment] = $update1(pathSegments, copied[pathSegment], update_fun, update)
        }
    }
    return copied
}


// library internal
export function $getElForPathIn(object: any, path: Array2<string|number>): any {

    if (!isArray2(path)) throw 'illegal argument in getElForPathIn - expected path as array with min length 2'

    return (function $(object, path) {

        const next = object[path[0]]

        return path.length === 1
            ? next
            : isAssociative(next)
                ? $(next, rest(path) as any)
                : undefined

    })(object, path)
}
