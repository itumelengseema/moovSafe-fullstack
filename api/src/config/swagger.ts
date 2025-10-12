import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MoovSafe API',
            version: '1.0.0',
            description: 'Complete Vehicle Fleet Management & Inspection System API',
            contact: {
                name: 'Itumeleng Seema',
                email: 'itumelengseema@outlook.com',
                url: 'https://github.com/itumelengseema'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://9c538d0e-70fa-437a-806a-e3ccbe1fcc92.us-east-1.cloud.genez.io',
                description: 'Production server (Genezio)'
            }
        ],
        components: {
            schemas: {
                Vehicle: {
                    type: 'object',
                    required: ['make', 'model', 'year', 'vin', 'engineNumber', 'licensePlate', 'fuelType', 'transmission', 'currentMileage', 'colour', 'vehicleType'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Unique identifier for the vehicle',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        make: {
                            type: 'string',
                            maxLength: 255,
                            description: 'Vehicle manufacturer',
                            example: 'Toyota'
                        },
                        model: {
                            type: 'string',
                            maxLength: 255,
                            description: 'Vehicle model',
                            example: 'Camry'
                        },
                        year: {
                            type: 'integer',
                            minimum: 1900,
                            maximum: 2030,
                            description: 'Manufacturing year',
                            example: 2022
                        },
                        vin: {
                            type: 'string',
                            maxLength: 50,
                            description: 'Vehicle Identification Number',
                            example: '1HGBH41JXMN109186'
                        },
                        engineNumber: {
                            type: 'string',
                            maxLength: 50,
                            description: 'Engine identification number',
                            example: 'ENG123456789'
                        },
                        licensePlate: {
                            type: 'string',
                            maxLength: 20,
                            description: 'Vehicle license plate number',
                            example: 'ABC123GP'
                        },
                        fuelType: {
                            type: 'string',
                            maxLength: 100,
                            description: 'Type of fuel used',
                            enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
                            example: 'Petrol'
                        },
                        transmission: {
                            type: 'string',
                            maxLength: 50,
                            description: 'Transmission type',
                            enum: ['Manual', 'Automatic', 'CVT'],
                            example: 'Automatic'
                        },
                        currentMileage: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Current vehicle mileage in kilometers',
                            example: 45000
                        },
                        colour: {
                            type: 'string',
                            maxLength: 50,
                            description: 'Vehicle color',
                            example: 'White'
                        },
                        imageUrl: {
                            type: 'string',
                            maxLength: 500,
                            description: 'URL to vehicle image',
                            example: 'https://res.cloudinary.com/example/image/upload/v1234567890/vehicle.jpg'
                        },
                        vehicleType: {
                            type: 'string',
                            maxLength: 50,
                            description: 'Type of vehicle',
                            enum: ['Car', 'Truck', 'Van', 'Motorcycle', 'Bus'],
                            example: 'Car'
                        },
                        status: {
                            type: 'string',
                            maxLength: 20,
                            description: 'Vehicle status',
                            enum: ['active', 'inactive'],
                            default: 'active',
                            example: 'active'
                        },
                        lastInspectionDate: {
                            type: 'string',
                            description: 'Date of last inspection (ISO string)',
                            example: '2024-10-12T10:30:00.000Z'
                        }
                    }
                },
                Inspection: {
                    type: 'object',
                    required: ['vehicleId', 'mileage', 'overallCondition'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Unique identifier for the inspection',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        vehicleId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the inspected vehicle',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Inspection date and time',
                            example: '2024-10-12T10:30:00.000Z'
                        },
                        mileage: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Vehicle mileage at time of inspection',
                            example: 45000
                        },
                        overallCondition: {
                            type: 'string',
                            maxLength: 100,
                            description: 'Overall vehicle condition',
                            enum: ['Good', 'Fair', 'Poor'],
                            example: 'Good'
                        },
                        exteriorWindshield: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Cracked', 'Needs Replacement'],
                            example: 'Good'
                        },
                        exteriorMirrors: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Missing', 'Damaged'],
                            example: 'Good'
                        },
                        exteriorLights: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Functional', 'Non-Functional', 'Partial'],
                            example: 'Functional'
                        },
                        exteriorTires: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Worn', 'Needs Replacement'],
                            example: 'Good'
                        },
                        engineOil: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Low', 'Change Needed', 'Empty'],
                            example: 'Good'
                        },
                        engineCoolant: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Low', 'Change Needed', 'Empty'],
                            example: 'Good'
                        },
                        engineBrakeFluid: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Low', 'Change Needed', 'Empty'],
                            example: 'Good'
                        },
                        engineTransmissionFluid: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Low', 'Change Needed', 'Empty'],
                            example: 'Good'
                        },
                        enginePowerSteering: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Low', 'Change Needed', 'Empty'],
                            example: 'Good'
                        },
                        engineBattery: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Weak', 'Replace Soon', 'Dead'],
                            example: 'Good'
                        },
                        interiorSeats: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Torn', 'Stained'],
                            example: 'Good'
                        },
                        interiorSeatbelts: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Frayed', 'Missing'],
                            example: 'Good'
                        },
                        interiorHorn: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Functional', 'Non-Functional', 'Weak'],
                            example: 'Functional'
                        },
                        interiorAC: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Functional', 'Non-Functional', 'Weak', 'Needs Service'],
                            example: 'Functional'
                        },
                        windows: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Functional', 'Non-Functional', 'Stuck', 'Cracked'],
                            example: 'Functional'
                        },
                        brakes: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Squeaking', 'Grinding'],
                            example: 'Good'
                        },
                        exhaust: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Good', 'Fair', 'Poor', 'Loud', 'Smoking'],
                            example: 'Good'
                        },
                        lightsIndicators: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Functional', 'Non-Functional', 'Partial'],
                            example: 'Functional'
                        },
                        spareTire: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Present', 'Absent', 'Poor', 'Good', 'Flat'],
                            example: 'Present'
                        },
                        jack: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Present', 'Absent', 'Damaged'],
                            example: 'Present'
                        },
                        wheelSpanner: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Present', 'Absent', 'Damaged'],
                            example: 'Present'
                        },
                        wheelLockNutTool: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Present', 'Absent'],
                            example: 'Present'
                        },
                        fireExtinguisher: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['Present', 'Absent', 'Expired', 'Empty'],
                            example: 'Present'
                        },
                        notes: {
                            type: 'string',
                            description: 'Additional notes about the inspection',
                            example: 'Vehicle is in excellent condition. No major issues found.'
                        },
                        faultsImagesUrl: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'Array of URLs to fault images',
                            example: ['https://res.cloudinary.com/example/image/upload/v1234567890/fault1.jpg']
                        },
                        odometerImageUrl: {
                            type: 'string',
                            maxLength: 255,
                            description: 'URL to odometer image',
                            example: 'https://res.cloudinary.com/example/image/upload/v1234567890/odometer.jpg'
                        }
                    }
                },
                MaintenanceHistory: {
                    type: 'object',
                    required: ['vehicleId', 'mileage', 'typeOfMaintenance', 'performedBy'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'Unique identifier for the maintenance record',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        vehicleId: {
                            type: 'string',
                            format: 'uuid',
                            description: 'ID of the vehicle being maintained',
                            example: '123e4567-e89b-12d3-a456-426614174000'
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Maintenance date and time',
                            example: '2024-10-12T10:30:00.000Z'
                        },
                        mileage: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Vehicle mileage at time of maintenance',
                            example: 45000
                        },
                        odometerImageUrl: {
                            type: 'string',
                            maxLength: 255,
                            description: 'URL to odometer image',
                            example: 'https://res.cloudinary.com/example/image/upload/v1234567890/odometer.jpg'
                        },
                        typeOfMaintenance: {
                            type: 'string',
                            maxLength: 100,
                            description: 'Type of maintenance performed',
                            example: 'Oil Change'
                        },
                        description: {
                            type: 'string',
                            description: 'Detailed description of maintenance work',
                            example: 'Changed engine oil and oil filter. Used synthetic 5W-30 oil.'
                        },
                        performedBy: {
                            type: 'string',
                            maxLength: 50,
                            enum: ['DIY', 'Workshop'],
                            description: 'Who performed the maintenance',
                            example: 'Workshop'
                        },
                        serviceCenter: {
                            type: 'string',
                            maxLength: 255,
                            description: 'Name of service center (if workshop)',
                            example: 'AutoFix Service Center'
                        },
                        cost: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Cost of maintenance in cents',
                            example: 15000
                        },
                        parts: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'List of parts used (if DIY)',
                            example: ['Oil Filter', 'Engine Oil - 5L']
                        },
                        invoicesUrl: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'Array of URLs to invoices/receipts',
                            example: ['https://res.cloudinary.com/example/image/upload/v1234567890/invoice.jpg']
                        },
                        photosUrl: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'Array of URLs to maintenance photos',
                            example: ['https://res.cloudinary.com/example/image/upload/v1234567890/before.jpg']
                        },
                        nextServiceDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Next scheduled service date',
                            example: '2024-11-12T10:30:00.000Z'
                        },
                        nextServiceMileage: {
                            type: 'integer',
                            minimum: 0,
                            description: 'Next service mileage',
                            example: 50000
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            description: 'Error message',
                            example: 'Vehicle not found'
                        },
                        message: {
                            type: 'string',
                            description: 'Detailed error message',
                            example: 'No vehicle found with the provided ID'
                        },
                        statusCode: {
                            type: 'integer',
                            description: 'HTTP status code',
                            example: 404
                        }
                    }
                }
            },
            responses: {
                BadRequest: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Validation failed',
                                message: 'Invalid input data provided',
                                statusCode: 400
                            }
                        }
                    }
                },
                NotFound: {
                    description: 'Resource not found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Not found',
                                message: 'The requested resource was not found',
                                statusCode: 404
                            }
                        }
                    }
                },
                InternalServerError: {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error'
                            },
                            example: {
                                error: 'Internal Server Error',
                                message: 'An unexpected error occurred',
                                statusCode: 500
                            }
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Vehicles',
                description: 'Vehicle management endpoints'
            },
            {
                name: 'Inspections',
                description: 'Vehicle inspection endpoints'
            },
            {
                name: 'Maintenance',
                description: 'Vehicle maintenance history endpoints'
            }
        ]
    },
    apis: ['./src/routes/**/*.ts', './src/routes/**/*.js'] // Path to the API files
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application): void => {
    const customCss = `
        .swagger-ui .topbar { display: none }
        
        /* Custom MoovSafe Brand Colors */
        .swagger-ui {
            background: oklch(100% 0 none);
            color: oklch(14.1% 0.004 286);
        }
        
        /* Logo Integration */
        .swagger-ui .info .title::before {
            content: '';
            background-image: url('https://res.cloudinary.com/dm5v9praz/image/upload/v1760298688/_Logo_2_xmxymy.png');
            background-size: 120px auto;
            background-repeat: no-repeat;
            background-position: center;
            display: block;
            height: 60px;
            width: 120px;
            margin: 0 auto 20px auto;
        }
        
        .swagger-ui .info .title {
            color: oklch(21% 0.006 286);
            text-align: center;
            margin-bottom: 20px;
        }
        
        /* Primary Colors */
        .swagger-ui .btn.authorize {
            background-color: oklch(21% 0.006 286);
            border-color: oklch(21% 0.006 286);
        }
        
        .swagger-ui .btn.authorize:hover {
            background-color: oklch(27.4% 0.005 286);
            border-color: oklch(27.4% 0.005 286);
        }
        
        /* Operation Blocks */
        .swagger-ui .opblock {
            background: oklch(96.8% 0.001 286);
            border: 1px solid oklch(92% 0.004 286);
        }
        
        .swagger-ui .opblock .opblock-summary {
            border-bottom: 1px solid oklch(92% 0.004 286);
        }
        
        .swagger-ui .opblock.opblock-post {
            border-color: #49cc90;
            background: rgba(73, 204, 144, .1);
        }
        
        .swagger-ui .opblock.opblock-get {
            border-color: #61affe;
            background: rgba(97, 175, 254, .1);
        }
        
        .swagger-ui .opblock.opblock-put {
            border-color: #fca130;
            background: rgba(252, 161, 48, .1);
        }
        
        .swagger-ui .opblock.opblock-delete {
            border-color: #f93e3e;
            background: rgba(249, 62, 62, .1);
        }
        
        /* Response Examples */
        .swagger-ui .responses-inner h4 {
            color: oklch(21% 0.006 286);
        }
        
        /* Schema Model */
        .swagger-ui .model {
            background: oklch(98.5% 0 none);
            border: 1px solid oklch(92% 0.004 286);
        }
        
        /* Input Fields */
        .swagger-ui input[type=text], 
        .swagger-ui textarea {
            background: oklch(100% 0 none);
            border: 1px solid oklch(92% 0.004 286);
            color: oklch(14.1% 0.004 286);
        }
        
        /* Try it out button */
        .swagger-ui .btn.try-out__btn {
            background: oklch(21% 0.006 286);
            color: oklch(98.5% 0 none);
            border-color: oklch(21% 0.006 286);
        }
        
        .swagger-ui .btn.execute {
            background: oklch(21% 0.006 286);
            color: oklch(98.5% 0 none);
            border-color: oklch(21% 0.006 286);
        }
        
        /* Custom Footer */
        .swagger-ui .info .description::after {
            content: '🚗 Powered by MoovSafe Fleet Management System';
            display: block;
            text-align: center;
            margin-top: 20px;
            padding: 15px;
            background: oklch(96.8% 0.001 286);
            border-radius: 8px;
            color: oklch(55.2% 0.014 286);
            font-style: italic;
        }
    `;

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
        customCss,
        customSiteTitle: 'MoovSafe API Documentation',
        customfavIcon: 'https://res.cloudinary.com/dm5v9praz/image/upload/v1760298688/_Logo_2_xmxymy.png',
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: 'none',
            filter: true,
            showRequestHeaders: true,
            tryItOutEnabled: true,
            theme: 'light'
        }
    }));

    console.log('📚 Swagger UI available at http://localhost:3000/api-docs');
};

export default specs;
