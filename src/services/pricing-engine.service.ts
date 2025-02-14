import { Condition, Operation } from '../interfaces';

export const evaluateConditions = (
  conditions: Condition[],
  customerData: Record<string, any>
): boolean => {
  if (conditions.length === 0) return true;

  let result = evaluateCondition(conditions[0], customerData);
  for (let i = 1; i < conditions.length; i++) {
    const currentResult = evaluateCondition(conditions[i], customerData);
    const combineType = conditions[i].type || 'AND';
    result = combineType === 'AND' ? result && currentResult : result || currentResult;
  }
  return result;
};

const evaluateCondition = (
  condition: Condition,
  customerData: Record<string, any>
): boolean => {
  const fieldValue = customerData[condition.field];
  switch (condition.operator) {
    case '>': return fieldValue > condition.value;
    case '<': return fieldValue < condition.value;
    case '==': return fieldValue === condition.value;
    case '!=': return fieldValue !== condition.value;
    default: throw new Error(`Invalid operator: ${condition.operator}`);
  }
};

export const applyOperation = (
  currentQuote: number,
  operation: Operation
): number => {
  switch (operation.operator) {
    case '+': return currentQuote + operation.value;
    case '-': return currentQuote - operation.value;
    case '*': return currentQuote * operation.value;
    case '/': return currentQuote / operation.value;
    default: throw new Error(`Invalid operator: ${operation.operator}`);
  }
};