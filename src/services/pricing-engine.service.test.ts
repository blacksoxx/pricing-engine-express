
import { Condition, Operation } from '../interfaces';
import { evaluateConditions, applyOperation } from './pricing-engine.service';

describe('Pricing Engine Service', () => {
  describe('evaluateConditions', () => {
    it('should return true if all conditions are met (AND)', () => {
      const conditions: Condition[] = [
        { field: 'age', operator: '>', value: 25 },
        { field: 'income', operator: '>', value: 40000, type: 'AND' },
      ];
      const customerData = { age: 30, income: 50000 };
      expect(evaluateConditions(conditions, customerData)).toBe(true);
    });

    it('should return false if any condition is not met (AND)', () => {
      const conditions: Condition[] = [
        { field: 'age', operator: '>', value: 25 },
        { field: 'income', operator: '>', value: 40000, type: 'AND' },
      ];
      const customerData = { age: 20, income: 50000 };
      expect(evaluateConditions(conditions, customerData)).toBe(false);
    });

    it('should return true if any condition is met (OR)', () => {
      const conditions: Condition[] = [
        { field: 'age', operator: '>', value: 25 },
        { field: 'income', operator: '>', value: 40000, type: 'OR' },
      ];
      const customerData = { age: 20, income: 50000 };
      expect(evaluateConditions(conditions, customerData)).toBe(true);
    });
  });

  describe('applyOperation', () => {
    it('should add a value to the quote', () => {
      const operation: Operation = { field: 'quote', operator: '+', value: 50 };
      expect(applyOperation(100, operation)).toBe(150);
    });

    it('should subtract a value from the quote', () => {
      const operation: Operation = { field: 'quote', operator: '-', value: 20 };
      expect(applyOperation(100, operation)).toBe(80);
    });

    it('should multiply the quote by a value', () => {
      const operation: Operation = { field: 'quote', operator: '*', value: 1.1 };
      expect(applyOperation(100, operation)).toBe(110);
    });

    it('should divide the quote by a value', () => {
      const operation: Operation = { field: 'quote', operator: '/', value: 2 };
      expect(applyOperation(100, operation)).toBe(50);
    });
  });
});