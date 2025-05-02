package validation

func validateEnum(value any, enumValues ...any) bool {
	isValid := false
	for _, enumValue := range enumValues {
		if value == enumValue {
			isValid = true
			break
		}
	}
	return isValid
}
