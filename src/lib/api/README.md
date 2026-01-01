# API Layer

This directory contains the API client implementations.

## Structure

- `mock/` - Mock API implementations for development and testing
- `real/` - Real API implementations using OpenAPI-generated types
- `index.ts` - API client exports and configuration

## Usage

Switch between mock and real APIs using the `VITE_API_MODE` environment variable:

```typescript
// In your components
import { apiClient } from '@/lib/api';

// The correct implementation (mock or real) will be used automatically
const data = await apiClient.getData();
```

## Adding New Endpoints

1. Create mock implementation in `mock/yourEndpoint.ts`
2. Create real implementation stub in `real/yourEndpoint.ts`
3. Export from `index.ts`
4. Add types to `src/types/`
