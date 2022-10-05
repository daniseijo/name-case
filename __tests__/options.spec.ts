import Environment, { nameCase, setOptions } from '../src'

describe('Test options', () => {
  it('tests the lazy flag', () => {
    expect(nameCase('Dougal MACDonald')).toBe('Dougal MACDonald')
    setOptions({ lazy: false })
    expect(nameCase('Dougal MACDonald')).toBe('Dougal MacDonald')
    setOptions({ lazy: true })
    expect(nameCase('Dougal MACDonald')).toBe('Dougal MACDonald')
  })

  it('tests the irish flag', () => {
    expect(nameCase('macmurdo')).toBe('MacMurdo')
    expect(nameCase('macmurdo', { irish: false })).toBe('Macmurdo')
    expect(nameCase('macmurdo')).toBe('MacMurdo')
  })

  it('tests the spanish flag', () => {
    const names = ['Ruiz y Picasso', 'Dato e Iradier', 'Mas i Gavarró']
    const ncEnvironment = new Environment({ spanish: true })
    for (const name of names) {
      expect(ncEnvironment.nameCase(name.toLowerCase())).toBe(name)
    }
    ncEnvironment.setOptions({ spanish: false })
    for (const name of names) {
      expect(ncEnvironment.nameCase(name.toLowerCase())).not.toBe(name)
    }
  })

  it('tests the roman flag', () => {
    setOptions({ roman: false })
    expect(nameCase('na li')).toBe('Na Li')
    setOptions({ roman: true })
    expect(nameCase('na li')).toBe('Na LI')
  })

  it('tests the hebrew flag', () => {
    setOptions({ hebrew: false })
    expect(nameCase('Aharon Ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon Ben Amram Ha-Kohein')
    expect(nameCase('Ben Gurion'.toLowerCase())).toBe('Ben Gurion')
    setOptions({ hebrew: true })
    expect(nameCase('Aharon ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon ben Amram Ha-Kohein')
    expect(nameCase('ben Gurion'.toLowerCase())).toBe('ben Gurion')
  })

  it('tests the postNominal flag', () => {
    setOptions({ postNominal: false })
    expect(nameCase('tam phd')).toBe('Tam Phd')
    setOptions({ postNominal: true })
    expect(nameCase('tam phd')).toBe('Tam PhD')
  })
})
