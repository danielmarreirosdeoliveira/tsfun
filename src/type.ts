// ------------ @author Daniel de Oliveira -----------------


export type Array1<T> = {
    0: T
} & Array<T>

export type Array2<T> = {
    0: T
    1: T
} & Array<T>

export type Array6<T> = {
    0: T
    1: T,
    2: T,
    3: T,
    4: T,
    5: T,
} & Array<T>


export type Expect<T, E> = T extends E ? (E extends T ? true : never) : never


export type Key = string|number


export type Path = Key|Array2<Key>


export type Effect<T = any> = (_: T) => void


export type Map<T> = {[_:string]: T}


export type Mapping<A = any, B = A> = (_: A) => B


export type Singleton<T = any> = [T]


export type Pair<A = any, B = A> = [A, B]


export type Fallible<T> = Either<any, T> | Maybe<T>


export type Either<L = any, R = any> = Failure<L>|Success<R>


export type Failure<T = any> = [T, undefined]


export type Success<T = any> = [undefined, T]


export type Ok<T> = Success<T>|Just<T>


export type Err<T> = Failure<T>|Nothing


export type Just<T = any> = [T]


export type Nothing = []


export type Maybe<T = any> = Nothing | Just<T>


export type Associative<T = any> = Map<T> | Array<T>


export type Filter<T = any> = Mapping<Array<T>>


export type Predicate<A = any> = (_: A) => boolean



//////// Internal or experimental ///////////////

export type Comparator<A = any, B = A> = (_: A) => Predicate<B>


export type ComparatorProducer = (_: Comparator) => Comparator


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>
