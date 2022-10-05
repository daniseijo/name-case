type EnvironmentOptions = {
  lazy?: boolean
  irish?: boolean
  spanish?: boolean
  roman?: boolean
  hebrew?: boolean
  postNominal?: boolean
}

class Environment {
  // Irish exceptions.
  private EXCEPTIONS = [
    [/\bMacEdo/, 'Macedo'],
    [/\bMacEvicius/, 'Macevicius'],
    [/\bMacHado/, 'Machado'],
    [/\bMacHar/, 'Machar'],
    [/\bMacHin/, 'Machin'],
    [/\bMacHlin/, 'Machlin'],
    [/\bMacIas/, 'Macias'],
    [/\bMacIulis/, 'Maciulis'],
    [/\bMacKie/, 'Mackie'],
    [/\bMacKle/, 'Mackle'],
    [/\bMacKlin/, 'Macklin'],
    [/\bMacKmin/, 'Mackmin'],
    [/\bMacQuarie/, 'Macquarie'],
    [/\bMacOmber/, 'Macomber'],
    [/\bMacIn/, 'Macin'],
    [/\bMacKintosh/, 'Mackintosh'],
    [/\bMacKen/, 'Macken'],
    [/\bMacHen/, 'Machen'],
    [/\bMacisaac/, 'MacIsaac'],
    [/\bMacHiel/, 'Machiel'],
    [/\bMacIol/, 'Maciol'],
    [/\bMacKell/, 'Mackell'],
    [/\bMacKlem/, 'Macklem'],
    [/\bMacKrell/, 'Mackrell'],
    [/\bMacLin/, 'Maclin'],
    [/\bMacKey/, 'Mackey'],
    [/\bMacKley/, 'Mackley'],
    [/\bMacHell/, 'Machell'],
    [/\bMacHon/, 'Machon'],
  ]

  // General replacements.
  private REPLACEMENTS = [
    [/\b(Al)(\s+\w)/, 'al$2'], // al Arabic or forename Al.
    [/\b(Ap)\b/, 'ap'], // ap Welsh.
    [/\b(Bin|Binti|Binte)\b/, 'bin'], // bin, binti, binte Arabic.
    [/\bDell([ae])\b/, 'dell$1'], // della and delle Italian.
    [/\bD([aeiou])\b/, 'd$1'], // da, de, di Italian; du French; do Brasil.
    [/\bD([ao]s)\b/, 'd$1'], // das, dos Brasileiros.
    [/\bDe([lrn])\b/, 'de$1'], // del Italian; der/den Dutch/Flemish.
    [/\bL([eo])\b/, 'l$1'], // lo Italian; le French.
    [/\b(El)\b/, 'el'], // el Greek or El Spanish.
    [/\b(La)\b/, 'la'], // la French or La Spanish.
    [/\b(Te)([rn])\b/, 'te$2'], // ten, ter Dutch/Flemish.
    [/\b(Van)(\s+\w)/, 'van$2'], // van German or forename Van.
    [/\b(Von)\b/, 'von'], // von Dutch/Flemish.
  ]

  private HEBREW = [
    [/\b(Ben)(\s+\w)/, 'ben$2'], // ben Hebrew or forename Ben.
    [/\b(Bat)(\s+\w)/, 'bat$2'], // bat Hebrew or forename Bat.
  ]

  // Spanish conjunctions.
  private CONJUNCTIONS = ['Y', 'E', 'I']

  // Roman letters regexp.
  private ROMAN_REGEX = /\b((?:[Xx]{1,3}|[Xx][Ll]|[Ll][Xx]{0,3})?(?:[Ii]{1,3}|[Ii][VvXx]|[Vv][Ii]{0,3})?)\b/g

  // Post nominal values.
  // prettier-ignore
  private POST_NOMINALS = [
    'ACILEx', 'ACSM', 'ADC', 'AEPC', 'AFC', 'AFM', 'AICSM', 'AKC', 'AM', 'ARBRIBA', 'ARCS', 'ARRC', 'ARSM', 'AUH', 'AUS',
    'BA', 'BArch', 'BCh', 'BChir', 'BCL', 'BDS', 'BEd', 'BEM', 'BEng', 'BM', 'BS', 'BSc', 'BSW', 'BVM&S', 'BVScBVetMed',
    'CB', 'CBE', 'CEng', 'CertHE', 'CGC', 'CGM', 'CH', 'CIE', 'CMarEngCMarSci', 'CMarTech', 'CMG', 'CMILT', 'CML', 'CPhT', 'CPLCTP', 'CPM', 'CQSW', 'CSciTeach', 'CSI', 'CTL', 'CVO',
    'DBE', 'DBEnv', 'DC', 'DCB', 'DCM', 'DCMG', 'DConstMgt', 'DCVO', 'DD', 'DEM', 'DFC', 'DFM', 'DIC', 'Dip', 'DipHE', 'DipLP', 'DipSW', 'DL', 'DLitt', 'DLP', 'DPhil', 'DProf', 'DPT', 'DREst', 'DSC', 'DSM', 'DSO', 'DSocSci',
    'ED', 'EdD', 'EJLog', 'EMLog', 'EN', 'EngD', 'EngTech', 'ERD', 'ESLog',
    'FADO', 'FAWM', 'FBDOFCOptom', 'FCEM', 'FCILEx', 'FCILT', 'FCSP.', 'FdAFdSc', 'FdEng', 'FFHOM', 'FFPM', 'FRCAFFPMRCA', 'FRCGP', 'FRCOG', 'FRCP', 'FRCPsych', 'FRCS', 'FRCVS', 'FSCR.',
    'GBE', 'GC', 'GCB', 'GCIE', 'GCILEx', 'GCMG', 'GCSI', 'GCVO', 'GM',
    'HNC', 'HNCert', 'HND', 'HNDip',
    'ICTTech', 'IDSM', 'IEng', 'IMarEng', 'IOMCPM', 'ISO',
    'J', 'JP', 'JrLog',
    'KBE', 'KC', 'KCB', 'KCIE', 'KCMG', 'KCSI', 'KCVO', 'KG', 'KP', 'KT',
    'LFHOM', 'LG', 'LJ', 'LLB', 'LLD', 'LLM', 'Log', 'LPE', /* 'LT', - excluded, see initial names */ 'LVO',
    'MA', 'MAcc', 'MAnth', 'MArch', 'MarEngTech', 'MB', 'MBA', 'MBChB', 'MBE', 'MBEIOM', 'MBiochem', 'MC', 'MCEM', 'MCGI', 'MCh.', 'MChem', 'MChiro', 'MClinRes', 'MComp', 'MCOptom', 'MCSM', 'MCSP', 'MD', 'MEarthSc', 'MEng', 'MEnt', 'MEP', 'MFHOM', 'MFin', 'MFPM', 'MGeol', 'MILT', 'MJur', 'MLA', 'MLitt', 'MM', 'MMath', 'MMathStat', 'MMORSE', 'MMus', 'MOst', 'MP', 'MPAMEd', 'MPharm', 'MPhil', 'MPhys', 'MRCGP', 'MRCOG', 'MRCP', 'MRCPath', 'MRCPCHFRCPCH', 'MRCPsych', 'MRCS', 'MRCVS', 'MRes', /* 'MS', - excluded, see initial names */ 'MSc', 'MScChiro', 'MSci', 'MSCR', 'MSM', 'MSocSc', 'MSP', 'MSt', 'MSW', 'MSYP', 'MVO',
    'NPQH',
    'OBE', 'OBI', 'OM', 'OND',
    'PgC', 'PGCAP', 'PGCE', 'PgCert', 'PGCHE', 'PgCLTHE', 'PgD', 'PGDE', 'PgDip', 'PhD', 'PLog', 'PLS',
    'QAM', 'QC', 'QFSM', 'QGM', 'QHC', 'QHDS', 'QHNS', 'QHP', 'QHS', 'QPM', 'QS', 'QTSCSci',
    'RD', 'RFHN', 'RGN', 'RHV', 'RIAI', 'RIAS', 'RM', 'RMN', 'RN', 'RN1RNA', 'RN2', 'RN3', 'RN4', 'RN5', 'RN6', 'RN7', 'RN8', 'RN9', 'RNC', 'RNLD', 'RNMH', 'ROH', 'RRC', 'RSAW', 'RSci', 'RSciTech', 'RSCN', 'RSN', 'RVM', 'RVN',
    'SCHM', 'SCJ', 'SCLD', 'SEN', 'SGM', 'SL', 'SPANSPMH', 'SPCC', 'SPCN', 'SPDN', 'SPHP', 'SPLD', 'SrLog', 'SRN', 'SROT',
    'TD',
    'UD',
    'V100', 'V200', 'V300', 'VC', 'VD', 'VetMB', 'VN', 'VRD'
  ];

  private LOWER_CASE_WORDS = ['The', 'Of', 'And']

  // Excluded post-nominals
  private postNominalsExcluded: string[] = []

  // Most two-letter words with no vowels should be kept in all caps as initials
  private INITIAL_NAME_REGEX = /\b(Aj|[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{2})\s/
  private INITIAL_NAME_EXCEPTIONS = [
    'Mr',
    'Ms', // Replaces Member of the Senedd post nominal.
    'Dr',
    'St',
    'Jr',
    'Sr',
    'Lt', // Replaces Lady of the Order of the Thistle post nominal.
  ]

  private options: EnvironmentOptions = {
    lazy: true,
    irish: true,
    spanish: true,
    roman: true,
    hebrew: true,
    postNominal: true,
  }

  private bckOptions: EnvironmentOptions = { ...this.options }

  constructor(options?: EnvironmentOptions) {
    this.setOptions(options)
  }

  /**
   * Global options setter.
   *
   * @param options
   */
  setOptions(options?: EnvironmentOptions): void {
    this.options = { ...this.options, ...options }
  }

  backupOptions(): void {
    this.bckOptions = { ...this.options }
  }

  restoreOptions(): void {
    this.options = { ...this.bckOptions }
  }

  /**
   * Global post-nominals exclusions setter.
   *
   * @param values
   * @returns boolean
   */
  excludePostNominals(values: string | string[]): void {
    this.postNominalsExcluded = this.postNominalsExcluded.concat(values)
  }

  /**
   * Main function for NameFixer.
   *
   * @param name
   * @param options
   *
   * @returns string
   */
  nameFixer(name: string, options: EnvironmentOptions = {}): string {
    if (name === '') return name

    this.backupOptions()

    this.setOptions(options)

    // Do not do anything if string is mixed and lazy option is true.
    if (this.options.lazy && this.skipMixed(name)) return name

    // Capitalize
    name = this.capitalizeFirstLetters(name)

    name = this.lowercaseFinalS(name)

    name = this.updateIrish(name)

    for (const [pattern, replacement] of this.getReplacements()) {
      name = name.replace(pattern, replacement)
    }

    name = this.correctInitialNames(name)

    name = this.correctLowerCaseWords(name)

    name = this.processOptions(name)

    this.restoreOptions()

    return name
  }

  private processOptions(name: string): string {
    if (this.options.roman) {
      name = this.updateRoman(name)
    }

    if (this.options.spanish) {
      name = this.updateSpanish(name)
    }

    if (this.options.postNominal) {
      name = this.fixPostNominal(name)
    }

    return name
  }

  /**
   * Capitalize first letters.
   *
   * @param name
   *
   * @returns string
   */
  private capitalizeFirstLetters(name: string): string {
    name = name.toLowerCase()
    return name.replace(/([\s,.:;"'(-]|^)([^\s,.:;"'(-])/g, (...matches) => matches[1] + matches[2].toUpperCase())
  }

  private lowercaseFinalS(name: string): string {
    // Lowercase 's
    return name.replace(
      /'([^\s,.:;"'(-])([\s,.:;"'(-]|$)/g,
      (...matches) => "'" + matches[1].toLowerCase() + matches[2]
    )
  }

  /**
   * Define required replacements.
   *
   * @return array
   */
  private getReplacements(): string[][] {
    // General fixes
    let replacements = this.REPLACEMENTS

    if (this.options.hebrew) {
      replacements = replacements.concat(this.HEBREW)
    }

    return replacements as string[][]
  }

  /**
   * Update for Irish names.
   *
   * @param name
   *
   * @returns string
   */
  private updateIrish(name: string): string {
    if (!this.options.irish) return name
    if (/.*?\bMac[A-Za-z]{2,}[^aciozj]\b/.test(name) || /.*?\bMc/.test(name)) {
      name = this.updateMac(name)
    }

    return name.replace(/\bMacmurdo/, 'MacMurdo').replace(/\bMacisaac/, 'MacIsaac')
  }

  /**
   * Updates irish Mac & Mc.
   *
   * @param name
   *
   * @returns string
   */
  private updateMac(name: string): string {
    name = name.replace(
      /\b(Ma?c)([A-Za-z]+)/,
      (...matches) => matches[1] + matches[2].charAt(0).toUpperCase() + matches[2].substring(1)
    )

    // Now fix "Mac" exceptions
    for (const [pattern, replacement] of this.EXCEPTIONS) {
      name = name.replace(pattern, replacement as string)
    }

    return name
  }

  /**
   * Fix roman numeral names.
   *
   * @param name
   *
   * @returns string
   */
  private updateRoman(name: string): string {
    return name.replace(this.ROMAN_REGEX, (...matches) => {
      return matches[0].toUpperCase()
    })
  }

  /**
   * Fix Spanish rules.
   *
   * @param name
   *
   * @returns string
   */
  private updateSpanish(name: string): string {
    for (const conjunction of this.CONJUNCTIONS) {
      name = name.replace(
        new RegExp(`([\\s,.:;"'-(]|^)${conjunction}([\\s,:;"'-(]|$)`, 'g'),
        (...matches) => matches[1] + conjunction.toLowerCase() + matches[2]
      )
    }
    return name
  }

  /**
   * Correct capitalization of initial names like JJ and TJ.
   *
   * @param name
   *
   * @return string
   */
  private correctInitialNames(name: string): string {
    return name.replace(this.INITIAL_NAME_REGEX, (...matches) => {
      const match = matches[0]

      if (this.INITIAL_NAME_EXCEPTIONS.includes(matches[1])) {
        return match
      }

      return match.toUpperCase()
    })
  }

  /**
   * Correct lower-case words of titles.
   *
   * @param name
   *
   * @return string
   */
  private correctLowerCaseWords(name: string): string {
    for (const lowerCase of this.LOWER_CASE_WORDS) {
      name = name.replace(
        new RegExp(`([\\s,.:;"'-(]|^)${lowerCase}([\\s,.:;"'-(]|$)`, 'g'),
        (...matches) => matches[1] + lowerCase.toLowerCase() + matches[2]
      )
    }
    return name
  }

  /**
   * Fix post-nominal letter cases.
   *
   * @param name
   * @returns string
   */
  private fixPostNominal(name: string): string {
    const postNominals = this.POST_NOMINALS.filter((x) => !this.postNominalsExcluded.includes(x))
    for (const postNominal of postNominals) {
      name = name.replace(
        new RegExp(`([\\s,.:;"'-(]|^)${this.capitalizeFirstLetters(postNominal)}([\\s,.:;"'-(]|$)`, 'g'),
        (...matches) => matches[1] + postNominal + matches[2]
      )
    }
    return name
  }

  /**
   * Skip if string is mixed case.
   *
   * @param name
   *
   * @returns bool
   */
  private skipMixed(name: string): boolean {
    const firstLetterLower = name[0] === name[0].toLowerCase()
    const allLowerOrUpper = name.toLowerCase() === name || name.toUpperCase() === name

    return !(firstLetterLower || allLowerOrUpper)
  }
}

const defaultEnvironment = new Environment()

export const setOptions = (options: EnvironmentOptions): void => defaultEnvironment.setOptions(options)
export const excludePostNominals = (values: string | string[]): void => defaultEnvironment.excludePostNominals(values)
export const nameFixer = (name: string, options?: EnvironmentOptions): string =>
  defaultEnvironment.nameFixer(name, options)

export default Environment
