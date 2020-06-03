// ------------ @author Daniel de Oliveira -----------------


export type Path = string|Array<string|number>;


export type Effect<T = any> = (_: T) => void


export interface Map<T = any> {[prop: string]: T}


export type Mapping<A = any, B = A> = (_: A) => B


export type Singleton<T = any> = [T]


export type Pair<A = any, B = A> = [A, B]


export type Failure<T = any> = [T, undefined]


export type Success<T = any> = [undefined, T]


export type Either<L = any, R = any> = Failure<L>|Success<R>


export type Just<T = any> = [T]


export type Nothing = []


export type Maybe<T = any> = Nothing | Just<T>


export type Associative<T = any> = Map<T> | Array<T>


export type List<T = any> = Array<T> | string


export type Collection<T = any> = Associative<T> | List<T>


export type Filter<T = any> = Mapping<Array<T>>


export type Predicate<A = any> = (_: A) => boolean



//////// Internal or experimental ///////////////

export type Comparator = <A, B>(_: A) => Predicate<B>


export type Fallible<T> = Either<any, T> | Maybe<T>


export type ComparatorProducer = (_: Comparator) => Comparator


export type PredicateProducer = <A>(_: Predicate<A>) => Predicate<A>


// see https://stackoverflow.com/questions/49910889/typescript-array-with-minimum-length
// for a discussion
type ArrayMinLength1<T> = {
    0: T
} & Array<T>


export type AsyncMapping<A = any, B = A> = (_: A) => Promise<B>