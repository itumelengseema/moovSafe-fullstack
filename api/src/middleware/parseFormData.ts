import { Request, Response, NextFunction } from 'express';

// Custom middleware to handle React Native FormData parsing issues
export function parseFormData() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('=== PARSING FORM DATA ===');
      console.log('Original req.body:', req.body);
      
      if (req.body && typeof req.body === 'object') {
        const parsedBody: any = {};
        
        // Handle each field in the body
        for (const [key, value] of Object.entries(req.body)) {
          if (Array.isArray(value)) {
            // Take first element if it's an array (FormData issue)
            parsedBody[key] = value[0];
            console.log(`Parsed array field ${key}: [${value}] -> "${value[0]}"`);
          } else {
            parsedBody[key] = value;
            console.log(`Parsed field ${key}: "${value}"`);
          }
        }
        
        // Convert specific fields to proper types
        if (parsedBody.mileage) {
          const mileageNum = parseInt(parsedBody.mileage);
          if (!isNaN(mileageNum)) {
            parsedBody.mileage = mileageNum;
            console.log(`Converted mileage to number: ${mileageNum}`);
          }
        }
        
        // Update req.body with parsed data
        req.body = parsedBody;
        console.log('Final parsed body:', req.body);
      }
      
      console.log('=== FORM DATA PARSED ===');
      next();
    } catch (error) {
      console.error('Form data parsing error:', error);
      res.status(500).json({ error: 'Failed to parse form data' });
    }
  };
}
