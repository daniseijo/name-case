import { excludePostNominals, nameFixer } from '../src'

describe('PostNominal exclusion', () => {
  it('tests "MBE" post-nominal', () => {
    expect(nameFixer('ADISA AZAPAGIC MBE FRENG FRSC FICHEME')).toBe('Adisa Azapagic MBE Freng Frsc Ficheme')
  })

  it('tests post-nominal string exclusion', () => {
    excludePostNominals('MOst')
    expect(nameFixer('ČERNÝ MOST')).toBe('Černý Most')
    expect(nameFixer('tam phd')).toBe('Tam PhD')
  })

  it('tests post-nominal array exclusion', () => {
    excludePostNominals(['MOst', 'BArch'])
    expect(nameFixer('ČERNÝ MOST')).toBe('Černý Most')
    expect(nameFixer('sebastian barch')).toBe('Sebastian Barch')
    expect(nameFixer('tam phd')).toBe('Tam PhD')
  })
})
