export const SUBJECTS = ['English', 'Mathematics', 'Science', 'Social Studies'];

export const TOPICS = {
  English: ['Grammar', 'Writing', 'Reading', 'Vocabulary'],
  Mathematics: ['Algebra', 'Geometry', 'Arithmetic'],
  Science: ['Physics', 'Chemistry', 'Biology'],
  'Social Studies': ['History', 'Geography', 'Civics'],
};

export const SUB_TOPICS = {
  Grammar: ['Application', 'Theory', 'Exercises'],
  Writing: ['Essay', 'Letter', 'Story'],
  Reading: ['Comprehension', 'Inference'],
  Vocabulary: ['Synonyms', 'Antonyms', 'Idioms'],
  Algebra: ['Linear', 'Quadratic'],
  Geometry: ['Triangles', 'Circles'],
  Arithmetic: ['Percentages', 'Ratios'],
  Physics: ['Mechanics', 'Optics'],
  Chemistry: ['Organic', 'Inorganic'],
  Biology: ['Botany', 'Zoology'],
  History: ['Ancient', 'Modern'],
  Geography: ['Physical', 'Human'],
  Civics: ['Constitution', 'Governance'],
};

export function getTopics(subject) {
  return TOPICS[subject] ?? [];
}

export function getSubTopics(topic) {
  return SUB_TOPICS[topic] ?? [];
}
