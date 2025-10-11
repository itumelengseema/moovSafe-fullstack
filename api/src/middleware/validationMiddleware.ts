import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import _ from 'lodash';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('=== VALIDATION ===');
      console.log('Validating request body:', req.body);
      console.log('Available files:', req.files ? Object.keys(req.files) : 'No files');

      // Parse and validate the body
      const validatedData = schema.parse(req.body);
      req.cleanBody = validatedData;

      console.log('Validation successful:', req.cleanBody);
      console.log('=== VALIDATION COMPLETE ===');
      next();
    } catch (error) {
      console.error('Validation error:', error);

      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          message: `${issue.path.join('.')} is ${issue.message}`,
        }));
        console.error('Validation details:', errorMessages);
        res.status(400).json({ error: 'Invalid data', details: errorMessages });
      } else {
        console.error('Unknown validation error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}
