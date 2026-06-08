'use server';
/**
 * @fileOverview A GenAI-powered tool that allows procurement officers to describe clinical needs
 * and receive automated, relevant medical equipment recommendations from HealthSync's catalog.
 *
 * - recommendMedicalEquipment - A function that handles the medical equipment recommendation process.
 * - ClinicalNeedsInput - The input type for the recommendMedicalEquipment function.
 * - MedicalEquipmentRecommendationOutput - The return type for the recommendMedicalEquipment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClinicalNeedsInputSchema = z.object({
  clinicalNeedsDescription: z
    .string()
    .describe(
      'A natural language description of the clinical needs or requirements for medical equipment/solutions.'
    ),
});
export type ClinicalNeedsInput = z.infer<typeof ClinicalNeedsInputSchema>;

const MedicalEquipmentRecommendationOutputSchema = z.object({
  recommendations: z
    .array(
      z.object({
        name: z.string().describe('The name of the recommended product or solution.'),
        description: z
          .string()
          .describe('A brief description of why this product/solution is relevant.'),
        category:
          z.enum([
            'Medical Equipment',
            'Laboratory Equipment',
            'Medical Supplies',
            'Healthcare Accessories',
            'Packaging Solutions',
            'Technical Support Services',
            'General Healthcare Solution'
          ])
          .describe('The category of the recommended product or solution.'),
      })
    )
    .describe('A list of recommended medical equipment and solutions.'),
});
export type MedicalEquipmentRecommendationOutput = z.infer<
  typeof MedicalEquipmentRecommendationOutputSchema
>;

export async function recommendMedicalEquipment(
  input: ClinicalNeedsInput
): Promise<MedicalEquipmentRecommendationOutput> {
  return medicalEquipmentRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicalEquipmentRecommendationPrompt',
  input: {schema: ClinicalNeedsInputSchema},
  output: {schema: MedicalEquipmentRecommendationOutputSchema},
  prompt: `You are an expert in healthcare solutions for HealthSync Medical Solutions Corporation, a trusted provider of medical equipment, laboratory equipment, healthcare supplies, and packaging solutions.

A procurement officer has described their clinical needs. Your task is to intelligently recommend relevant medical equipment and solutions from HealthSync's catalog based on their description. Focus on providing practical and suitable recommendations.

HealthSync offers the following categories of solutions:
- Medical Equipment Solutions
- Laboratory Equipment Solutions
- Medical Supplies
- Healthcare Accessories
- Packaging Solutions
- Technical Support Services

Clinical Needs Description: {{{clinicalNeedsDescription}}}

Provide your recommendations in the specified JSON format, including the product/solution name, a brief description, and its most relevant category. If no specific category from the list fits perfectly, use 'General Healthcare Solution'.`,
});

const medicalEquipmentRecommendationFlow = ai.defineFlow(
  {
    name: 'medicalEquipmentRecommendationFlow',
    inputSchema: ClinicalNeedsInputSchema,
    outputSchema: MedicalEquipmentRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
