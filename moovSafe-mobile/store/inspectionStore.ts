import { create } from 'zustand';

interface Inspection {
    id: string;
    vehicleId: string;
    date: string;
    mileage: number;
    overallCondition: string;
    // Exterior
    exteriorWindshield?: string | null;
    exteriorMirrors?: string | null;
    exteriorLights?: string | null;
    exteriorTires?: string | null;
    // Engine & Fluids
    engineOil?: string | null;
    engineCoolant?: string | null;
    engineBrakeFluid?: string | null;
    engineTransmissionFluid?: string | null;
    enginePowerSteering?: string | null;
    engineBattery?: string | null;
    // Interior
    interiorSeats?: string | null;
    interiorSeatbelts?: string | null;
    interiorHorn?: string | null;
    interiorAC?: string | null;
    windows?: string | null;
    // Mechanical / Safety
    brakes?: string | null;
    exhaust?: string | null;
    lightsIndicators?: string | null;
    // Optional / Other
    spareTire?: string | null;
    jack?: string | null;
    wheelSpanner?: string | null;
    wheelLockNutTool?: string | null;
    fireExtinguisher?: string | null;
    // Additional
    notes?: string | null;
    faultsImagesUrl?: string[];
    odometerImageUrl?: string | null;
}

interface InspectionStore {
    inspections: Inspection[];
    currentInspection: Partial<Inspection> | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setInspections: (inspections: Inspection[]) => void;
    addInspection: (inspection: Inspection) => void;
    updateInspection: (id: string, inspection: Partial<Inspection>) => void;
    deleteInspection: (id: string) => void;
    setCurrentInspection: (inspection: Partial<Inspection> | null) => void;
    updateCurrentInspection: (data: Partial<Inspection>) => void;
    clearCurrentInspection: () => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useInspectionStore = create<InspectionStore>((set, get) => ({
    inspections: [],
    currentInspection: null,
    isLoading: false,
    error: null,

    setInspections: (inspections) => set({ inspections }),

    addInspection: (inspection) =>
        set((state) => ({
            inspections: [...state.inspections, inspection]
        })),

    updateInspection: (id, updatedInspection) =>
        set((state) => ({
            inspections: state.inspections.map((inspection) =>
                inspection.id === id ? { ...inspection, ...updatedInspection } : inspection
            ),
        })),

    deleteInspection: (id) =>
        set((state) => ({
            inspections: state.inspections.filter((inspection) => inspection.id !== id),
        })),

    setCurrentInspection: (inspection) => set({ currentInspection: inspection }),

    updateCurrentInspection: (data) =>
        set((state) => ({
            currentInspection: state.currentInspection
                ? { ...state.currentInspection, ...data }
                : data,
        })),

    clearCurrentInspection: () => set({ currentInspection: null }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
}));