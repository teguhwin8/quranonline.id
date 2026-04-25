"use client";

import React from "react";

export type PaperSize = "A4" | "A5" | "F4" | "Letter" | "custom";
export type MarginSize = "narrow" | "normal" | "wide" | "custom";
export type SizeUnit = "mm" | "cm";

export interface PDFSettings {
  arabicFontSize: number;
  arabicFontSizeCustom: boolean;
  arabicFontSizeInput: number;
  paperSize: PaperSize;
  paperCustomWidth: number;
  paperCustomHeight: number;
  paperCustomUnit: SizeUnit;
  marginSize: MarginSize;
  marginCustomValue: number;
  marginCustomUnit: SizeUnit;
  includeTranslation: boolean;
  translationFontSize: number;
  translationFontSizeCustom: boolean;
  translationFontSizeInput: number;
  includeTransliteration: boolean;
  transliterationFontSize: number;
  transliterationFontSizeCustom: boolean;
  transliterationFontSizeInput: number;
}

export const DEFAULT_PDF_SETTINGS: PDFSettings = {
  arabicFontSize: 56,
  arabicFontSizeCustom: false,
  arabicFontSizeInput: 56,
  paperSize: "A4",
  paperCustomWidth: 210,
  paperCustomHeight: 297,
  paperCustomUnit: "mm",
  marginSize: "normal",
  marginCustomValue: 15,
  marginCustomUnit: "mm",
  includeTranslation: false,
  translationFontSize: 12,
  translationFontSizeCustom: false,
  translationFontSizeInput: 12,
  includeTransliteration: false,
  transliterationFontSize: 11,
  transliterationFontSizeCustom: false,
  transliterationFontSizeInput: 11,
};

const PAPER_SIZES: { value: PaperSize; label: string }[] = [
  { value: "A4", label: "A4 (210 × 297 mm)" },
  { value: "A5", label: "A5 (148 × 210 mm)" },
  { value: "F4", label: "F4 (215 × 330 mm)" },
  { value: "Letter", label: "Letter (216 × 279 mm)" },
  { value: "custom", label: "Custom..." },
];

const MARGIN_SIZES: { value: MarginSize; label: string }[] = [
  { value: "narrow", label: "Sempit (5 mm)" },
  { value: "normal", label: "Normal (15 mm)" },
  { value: "wide", label: "Lebar (25 mm)" },
  { value: "custom", label: "Custom..." },
];

/** Resolve the final margin CSS value from settings */
export function resolveMargin(s: PDFSettings): string {
  if (s.marginSize === "custom") return `${s.marginCustomValue}${s.marginCustomUnit}`;
  const map: Record<string, string> = { narrow: "5mm", normal: "15mm", wide: "25mm" };
  return map[s.marginSize];
}

/** Resolve the final paper size CSS value */
export function resolvePaperSize(s: PDFSettings): string {
  if (s.paperSize === "custom")
    return `${s.paperCustomWidth}${s.paperCustomUnit} ${s.paperCustomHeight}${s.paperCustomUnit}`;
  const map: Record<string, string> = {
    A4: "A4",
    A5: "A5",
    F4: "215mm 330mm",
    Letter: "Letter",
  };
  return map[s.paperSize];
}

/** Resolve effective arabic font size */
export function resolveArabicFontSize(s: PDFSettings): number {
  return s.arabicFontSizeCustom ? s.arabicFontSizeInput : s.arabicFontSize;
}

/** Resolve effective translation font size */
export function resolveTranslationFontSize(s: PDFSettings): number {
  return s.translationFontSizeCustom ? s.translationFontSizeInput : s.translationFontSize;
}

/** Resolve effective transliteration font size */
export function resolveTransliterationFontSize(s: PDFSettings): number {
  return s.transliterationFontSizeCustom ? s.transliterationFontSizeInput : s.transliterationFontSize;
}

interface PDFSettingsModalProps {
  readonly settings: PDFSettings;
  readonly onChange: (settings: PDFSettings) => void;
  readonly onConfirm: () => void;
  readonly onClose: () => void;
}

function Toggle({ checked, onToggle }: { readonly checked: boolean; readonly onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
        checked ? "bg-primary" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

interface FontSizeRowProps {
  readonly id: string;
  readonly label: string;
  readonly min: number;
  readonly max: number;
  readonly value: number;
  readonly isCustom: boolean;
  readonly customValue: number;
  readonly onSlider: (v: number) => void;
  readonly onToggleCustom: () => void;
  readonly onCustomInput: (v: number) => void;
}

function FontSizeRow({
  id, label, min, max, value, isCustom, customValue,
  onSlider, onToggleCustom, onCustomInput,
}: FontSizeRowProps) {
  const displaySize = isCustom ? customValue : value;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          <span className="ml-2 text-primary font-semibold">{displaySize}pt</span>
        </label>
        <button
          type="button"
          onClick={onToggleCustom}
          className="text-xs text-foreground-muted hover:text-primary transition-colors"
        >
          {isCustom ? "← Slider" : "Custom"}
        </button>
      </div>
      {isCustom ? (
        <input
          id={id}
          type="number"
          min={min}
          max={999}
          value={customValue}
          onChange={(e) => onCustomInput(Number(e.target.value))}
          className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={`Ukuran font (pt)`}
        />
      ) : (
        <>
          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => onSlider(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-foreground-muted mt-1">
            <span>{min}pt</span>
            <span>{max}pt</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function PDFSettingsModal({ settings, onChange, onConfirm, onClose }: PDFSettingsModalProps) {
  const set = <K extends keyof PDFSettings>(key: K, value: PDFSettings[K]) =>
    onChange({ ...settings, [key]: value });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-card-bg rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 id="pdf-modal-title" className="text-lg font-semibold text-foreground">
            Pengaturan PDF
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground transition-colors"
            aria-label="Tutup"
          >
            <i className="ri-close-line text-xl" />
          </button>
        </div>

        <div className="space-y-5">

          {/* Paper Size */}
          <div>
            <label htmlFor="pdf-paper-size" className="block text-sm font-medium text-foreground mb-1.5">
              Ukuran Kertas
            </label>
            <select
              id="pdf-paper-size"
              value={settings.paperSize}
              onChange={(e) => set("paperSize", e.target.value as PaperSize)}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {PAPER_SIZES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>

            {settings.paperSize === "custom" && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <label htmlFor="pdf-paper-w" className="block text-xs text-foreground-muted mb-1">Lebar</label>
                    <input
                      id="pdf-paper-w"
                      type="number"
                      min={1}
                      value={settings.paperCustomWidth}
                      onChange={(e) => set("paperCustomWidth", Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="pdf-paper-h" className="block text-xs text-foreground-muted mb-1">Tinggi</label>
                    <input
                      id="pdf-paper-h"
                      type="number"
                      min={1}
                      value={settings.paperCustomHeight}
                      onChange={(e) => set("paperCustomHeight", Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="pt-5">
                    <select
                      aria-label="Satuan ukuran kertas"
                      value={settings.paperCustomUnit}
                      onChange={(e) => set("paperCustomUnit", e.target.value as SizeUnit)}
                      className="rounded-lg border border-border bg-background text-foreground px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Margin */}
          <div>
            <label htmlFor="pdf-margin" className="block text-sm font-medium text-foreground mb-1.5">
              Margin
            </label>
            <select
              id="pdf-margin"
              value={settings.marginSize}
              onChange={(e) => set("marginSize", e.target.value as MarginSize)}
              className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MARGIN_SIZES.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>

            {settings.marginSize === "custom" && (
              <div className="mt-2 flex gap-2 items-end">
                <div className="flex-1">
                  <label htmlFor="pdf-margin-val" className="block text-xs text-foreground-muted mb-1">Nilai margin</label>
                  <input
                    id="pdf-margin-val"
                    type="number"
                    min={0}
                    value={settings.marginCustomValue}
                    onChange={(e) => set("marginCustomValue", Number(e.target.value))}
                    className="w-full rounded-lg border border-border bg-background text-foreground px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <select
                    aria-label="Satuan margin"
                    value={settings.marginCustomUnit}
                    onChange={(e) => set("marginCustomUnit", e.target.value as SizeUnit)}
                    className="rounded-lg border border-border bg-background text-foreground px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Arabic Font Size */}
          <FontSizeRow
            id="pdf-arabic-font"
            label="Ukuran Font Arab"
            min={24}
            max={80}
            value={settings.arabicFontSize}
            isCustom={settings.arabicFontSizeCustom}
            customValue={settings.arabicFontSizeInput}
            onSlider={(v) => set("arabicFontSize", v)}
            onToggleCustom={() => set("arabicFontSizeCustom", !settings.arabicFontSizeCustom)}
            onCustomInput={(v) => set("arabicFontSizeInput", v)}
          />

          {/* Include Transliteration */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Sertakan Bacaan Latin</span>
            <Toggle
              checked={settings.includeTransliteration}
              onToggle={() => set("includeTransliteration", !settings.includeTransliteration)}
            />
          </div>

          {settings.includeTransliteration && (
            <FontSizeRow
              id="pdf-latin-font"
              label="Ukuran Font Latin"
              min={8}
              max={24}
              value={settings.transliterationFontSize}
              isCustom={settings.transliterationFontSizeCustom}
              customValue={settings.transliterationFontSizeInput}
              onSlider={(v) => set("transliterationFontSize", v)}
              onToggleCustom={() => set("transliterationFontSizeCustom", !settings.transliterationFontSizeCustom)}
              onCustomInput={(v) => set("transliterationFontSizeInput", v)}
            />
          )}

          {/* Include Translation */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Sertakan Terjemahan</span>
            <Toggle
              checked={settings.includeTranslation}
              onToggle={() => set("includeTranslation", !settings.includeTranslation)}
            />
          </div>

          {settings.includeTranslation && (
            <FontSizeRow
              id="pdf-translation-font"
              label="Ukuran Font Terjemahan"
              min={8}
              max={24}
              value={settings.translationFontSize}
              isCustom={settings.translationFontSizeCustom}
              customValue={settings.translationFontSizeInput}
              onSlider={(v) => set("translationFontSize", v)}
              onToggleCustom={() => set("translationFontSizeCustom", !settings.translationFontSizeCustom)}
              onCustomInput={(v) => set("translationFontSizeInput", v)}
            />
          )}

        </div>

        <div className="flex gap-3 mt-6">
          <button type="button" onClick={onClose} className="btn btn-ghost flex-1">
            Batal
          </button>
          <button type="button" onClick={onConfirm} className="btn btn-primary flex-1">
            <i className="ri-download-2-line" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
