import { excludePostNominals, nameCase } from '../src'

describe('PostNominal exclusion', () => {
  it('tests "MBE" post-nominal', () => {
    expect(nameCase('ADISA AZAPAGIC MBE FRENG FRSC FICHEME')).toBe('Adisa Azapagic MBE Freng Frsc Ficheme')
  })

  it('tests post-nominal string exclusion', () => {
    excludePostNominals('MOst')
    expect(nameCase('ČERNÝ MOST')).toBe('Černý Most')
    expect(nameCase('tam phd')).toBe('Tam PhD')
  })

  it('tests post-nominal array exclusion', () => {
    excludePostNominals(['MOst', 'BArch'])
    expect(nameCase('ČERNÝ MOST')).toBe('Černý Most')
    expect(nameCase('sebastian barch')).toBe('Sebastian Barch')
    expect(nameCase('tam phd')).toBe('Tam PhD')
  })
})
