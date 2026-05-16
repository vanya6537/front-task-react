const MAX_SAFE_NUMBER = Number.MAX_SAFE_INTEGER
const MAX_SAFE_NUMBER_STRING = String(MAX_SAFE_NUMBER)

function normalizeNumberString(value: string | number): string {
  const rawValue = String(value)

  // Prevent broken number render states such as 3.5e+21, Infinity, NaN.
  if (
    rawValue.includes('e') ||
    rawValue.includes('E') ||
    rawValue === 'Infinity' ||
    rawValue === 'NaN'
  ) {
    return '0'
  }

  const digitsOnly = rawValue.replace(/[^\d]/g, '')
  const withoutLeadingZeros = digitsOnly.replace(/^0+(?=\d)/, '')

  return withoutLeadingZeros || '0'
}

function isGreaterThanMaxSafeInteger(value: string): boolean {
  if (value.length > MAX_SAFE_NUMBER_STRING.length) {
    return true
  }

  if (value.length < MAX_SAFE_NUMBER_STRING.length) {
    return false
  }

  return value > MAX_SAFE_NUMBER_STRING
}

function maskNumber(value: string | number): string {
  const normalizedValue = normalizeNumberString(value)

  return normalizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function parseSafeNumberInput(value: string): number | null {
  const normalizedValue = normalizeNumberString(value)

  if (isGreaterThanMaxSafeInteger(normalizedValue)) {
    return null
  }

  const numberValue = Number(normalizedValue)

  if (!Number.isFinite(numberValue)) {
    return 0
  }

  return numberValue
}

export { maskNumber, parseSafeNumberInput, isGreaterThanMaxSafeInteger, normalizeNumberString, MAX_SAFE_NUMBER }
