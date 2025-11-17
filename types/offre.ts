export interface Offre {
  id: string;
  slug: string;
  titre: string;
  description: string;
  descriptionCourte: string;
  dateDebut: string;
  dateFin: string;
  image?: string | null;
  prix?: number | null;
  prixOriginal?: number | null;
  pourcentageReduction?: number | null;
  actif: boolean;
  misEnAvant?: boolean;
}
