package mapper

type MapFunc[T any, U any] func(T) U

// Map is a aliased call to the underlying function, it is optional
// to define this method, but it can be useful for readability.
func (f MapFunc[T, U]) Map(item T) U {
	return f(item)
}

// MapEach is a convenience method for mapping a slice of items to a slice of
// the same length of a different type.
func (f MapFunc[T, U]) MapEach(items []T) []U {
	result := make([]U, len(items))
	for i, item := range items {
		result[i] = f(item)
	}
	return result
}
