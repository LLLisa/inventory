/**
 * We import jsPDF's browser ESM build by its explicit dist path so Metro doesn't
 * resolve the Node build (which uses an AMD `require` Metro can't transform).
 * Re-export the real types from the package so callers stay fully typed.
 */
declare module 'jspdf/dist/jspdf.es.min.js' {
  export { jsPDF } from 'jspdf';
}
