export interface InfoPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  category: 'diagnosis' | 'treatment' | 'lifestyle' | 'emergency' | 'research';
}