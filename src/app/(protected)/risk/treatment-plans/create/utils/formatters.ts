// /app/risk/treatment-plans/create/utils/formatters.ts
export const formatCurrency = (amount: string): string => {
    // Remove any non-numeric characters except decimal point
    const numericValue = amount.replace(/[^\d.]/g, '');
    
    if (!numericValue) return '';
    
    const number = parseFloat(numericValue);
    if (isNaN(number)) return amount;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  
  export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };
  
  export const formatRiskScore = (score: number): string => {
    if (score >= 80) return `${score} (Critical)`;
    if (score >= 60) return `${score} (High)`;
    if (score >= 40) return `${score} (Medium)`;
    return `${score} (Low)`;
  };
  
  export const generateTreatmentPlanId = (): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `TP-${timestamp}-${randomStr}`.toUpperCase();
  };