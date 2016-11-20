export interface IDomainAlignment {

  id: string;

  dom1: string;
  dom2: string;

  hhEVal: number;
  algLen: number;
  idPer: number;
  simPer: number;
  gapPer: number;
  dom1Start: number;
  dom1End: number;
  dom2Start: number;
  dom2End: number;
  hhProb: number;
  hhScore: number;
  aaLen: number;
  aaId: number;
  aaSim: number;
  aaGap: number;
  rmsd: number;
  tmscore: number;
  maxsub: number;
  gdtts: number;
  gdtha: number;

  dom1_fid: string;
  dom2_fid: string;
}
