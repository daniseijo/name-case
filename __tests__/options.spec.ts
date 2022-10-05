import Environment, { nameFixer, setOptions } from '../src'

describe('Test options', () => {
  it('tests the lazy flag', () => {
    expect(nameFixer('Dougal MACDonald')).toBe('Dougal MACDonald')
    setOptions({ lazy: false })
    expect(nameFixer('Dougal MACDonald')).toBe('Dougal MacDonald')
    setOptions({ lazy: true })
    expect(nameFixer('Dougal MACDonald')).toBe('Dougal MACDonald')
  })

  it('tests the irish flag', () => {
    expect(nameFixer('macmurdo')).toBe('MacMurdo')
    expect(nameFixer('macmurdo', { irish: false })).toBe('Macmurdo')
    expect(nameFixer('macmurdo')).toBe('MacMurdo')
  })

  it('tests the spanish flag', () => {
    const names = ['Ruiz y Picasso', 'Dato e Iradier', 'Mas i Gavarró']
    const nfEnvironment = new Environment({ spanish: true })
    for (const name of names) {
      expect(nfEnvironment.nameFixer(name.toLowerCase())).toBe(name)
    }
    nfEnvironment.setOptions({ spanish: false })
    for (const name of names) {
      expect(nfEnvironment.nameFixer(name.toLowerCase())).not.toBe(name)
    }
  })

  it('tests the roman flag', () => {
    setOptions({ roman: false })
    expect(nameFixer('na li')).toBe('Na Li')
    setOptions({ roman: true })
    expect(nameFixer('na li')).toBe('Na LI')
  })

  it('tests the hebrew flag', () => {
    setOptions({ hebrew: false })
    expect(nameFixer('Aharon Ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon Ben Amram Ha-Kohein')
    expect(nameFixer('Ben Gurion'.toLowerCase())).toBe('Ben Gurion')
    setOptions({ hebrew: true })
    expect(nameFixer('Aharon ben Amram Ha-Kohein'.toLowerCase())).toBe('Aharon ben Amram Ha-Kohein')
    expect(nameFixer('ben Gurion'.toLowerCase())).toBe('ben Gurion')
  })

  it('tests the postNominal flag', () => {
    setOptions({ postNominal: false })
    expect(nameFixer('tam phd')).toBe('Tam Phd')
    setOptions({ postNominal: true })
    expect(nameFixer('tam phd')).toBe('Tam PhD')
  })
})
