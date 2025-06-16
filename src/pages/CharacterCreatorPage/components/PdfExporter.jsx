// PdfExporter.jsx
import { jsPDF } from "jspdf";
//import "./PdfExporter.css"; 

export const exportToPdf = (character) => {
  const doc = new jsPDF();
  
  // Configurações básicas
  doc.setFont("helvetica");
  doc.setFontSize(12);
  
  // Título
  doc.setFontSize(16);
  doc.text("Character Sheet", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.line(20, 25, 190, 25);
  
  // Seção: Basic Information
  doc.setFontSize(14);
  doc.text("Basic Information", 20, 35);
  doc.setFontSize(12);
  
  // Nome e informações básicas
  doc.text(`Character Name: ${character.name || "-"}`, 20, 45);
  doc.text(`Class: ${character.class || "-"}`, 20, 55);
  doc.text(`Race: ${character.race || "-"}`, 20, 65);
  doc.text(`Gender: ${character.gender || "-"}`, 20, 75);
  
  // Idade, altura e peso
  doc.text(`Age: ${character.age || "-"}`, 120, 45);
  doc.text(`Height (cm): ${character.height || "-"}`, 120, 55);
  doc.text(`Weight (Kg): ${character.weight || "-"}`, 120, 65);
  
  // Cores
  doc.text(`Eye Color: ${character.eyeColor || "-"}`, 20, 85);
  doc.text(`Skin Color: ${character.skinColor || "-"}`, 20, 95);
  doc.text(`Hair Color: ${character.hairColor || "-"}`, 20, 105);
  
  // Descrição
  doc.text(`Description: ${character.description || "-"}`, 20, 115);
  
  // Seção: Additional Traits & Talents
  doc.setFontSize(14);
  doc.text("Additional Traits & Talents", 20, 130);
  doc.setFontSize(12);
  doc.text(character.traits || "Personality traits, ideals, bonds, flaws, and special abilities...", 20, 140, { maxWidth: 170 });
  
  // Seção: Equipment
  doc.setFontSize(14);
  doc.text("Equipment", 20, 160);
  doc.setFontSize(12);
  doc.text(character.equipment || "Weapons, armor, and other possessions...", 20, 170, { maxWidth: 170 });
  
  // Seção: AI Generation
  doc.setFontSize(14);
  doc.text("AI Generation", 20, 190);
  doc.setFontSize(12);
  
  // História do personagem
  doc.text("Character History:", 20, 200);
  doc.text(character.history || "Will be automatically generated...", 20, 210, { maxWidth: 170 });
  
  // Aliados e organizações
  doc.text(`Allies & Organizations: ${character.allies || "-"}`, 20, 230);
  
  // Notas
  doc.text(`Notes: ${character.notes || "Additional notes about the character..."}`, 20, 240, { maxWidth: 170 });
  
  // Salva o PDF
  doc.save(`${character.name || "character"}_sheet.pdf`);
};