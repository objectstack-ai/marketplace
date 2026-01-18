/**
 * Mock Registry Data Layer
 * This provides sample data until the live Registry API is available
 */

export type PackageType = 'driver' | 'plugin' | 'module';

export interface Author {
  name: string;
  avatar: string;
  url: string;
}

export interface PackageStats {
  downloads: number;
  stars: number;
}

export interface RegistryPackage {
  id: string;
  name: string;
  version: string;
  description: string;
  author: Author;
  type: PackageType;
  stats: PackageStats;
  tags: string[];
  readme: string;
  license?: string;
  repository?: string;
  lastUpdated: string;
  isOfficial?: boolean;
  isTrending?: boolean;
  icon?: string;
}

// Mock data for core drivers and plugins
export const mockPackages: RegistryPackage[] = [
  {
    id: 'driver-postgres',
    name: 'driver-postgres',
    version: '1.2.0',
    description: 'Official PostgreSQL driver for ObjectStack. Connect to Postgres databases with full SQL support and type safety.',
    author: {
      name: 'ObjectStack Team',
      avatar: '/avatars/objectstack.png',
      url: 'https://github.com/objectstack-ai'
    },
    type: 'driver',
    stats: {
      downloads: 45230,
      stars: 892
    },
    tags: ['database', 'sql', 'postgresql', 'relational'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-ai/driver-postgres',
    lastUpdated: '2024-01-15',
    isOfficial: true,
    icon: '🐘',
    readme: `# PostgreSQL Driver for ObjectStack

The official PostgreSQL driver provides seamless integration with PostgreSQL databases.

## Features

- ✅ Full SQL support with type safety
- ✅ Connection pooling
- ✅ Transaction management
- ✅ Query builder integration
- ✅ Migration support

## Installation

\`\`\`bash
ostack add driver-postgres
\`\`\`

## Quick Start

\`\`\`typescript
import { PostgresDriver } from '@objectstack/driver-postgres';

const db = new PostgresDriver({
  host: 'localhost',
  port: 5432,
  database: 'mydb',
  user: 'postgres',
  password: 'secret'
});

await db.connect();
const users = await db.query('SELECT * FROM users');
\`\`\`

## Configuration

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| host | string | Yes | Database host |
| port | number | No | Port (default: 5432) |
| database | string | Yes | Database name |
| user | string | Yes | Username |
| password | string | Yes | Password |

## Advanced Usage

### Connection Pooling

\`\`\`typescript
const db = new PostgresDriver({
  // ... connection options
  pool: {
    min: 2,
    max: 10
  }
});
\`\`\`

### Transactions

\`\`\`typescript
await db.transaction(async (tx) => {
  await tx.query('INSERT INTO users (name) VALUES ($1)', ['Alice']);
  await tx.query('INSERT INTO logs (action) VALUES ($1)', ['user_created']);
});
\`\`\`

## License

MIT © ObjectStack Team
`
  },
  {
    id: 'driver-redis',
    name: 'driver-redis',
    version: '1.5.3',
    description: 'High-performance Redis driver for ObjectStack. Perfect for caching, session storage, and real-time applications.',
    author: {
      name: 'ObjectStack Team',
      avatar: '/avatars/objectstack.png',
      url: 'https://github.com/objectstack-ai'
    },
    type: 'driver',
    stats: {
      downloads: 38920,
      stars: 745
    },
    tags: ['cache', 'redis', 'nosql', 'key-value', 'real-time'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-ai/driver-redis',
    lastUpdated: '2024-01-10',
    isOfficial: true,
    icon: '🔴',
    readme: `# Redis Driver for ObjectStack

Official Redis driver with support for caching, pub/sub, and advanced data structures.

## Features

- ✅ Full Redis command support
- ✅ Pub/Sub messaging
- ✅ Cluster support
- ✅ Redis Streams
- ✅ Automatic reconnection

## Installation

\`\`\`bash
ostack add driver-redis
\`\`\`

## Quick Start

\`\`\`typescript
import { RedisDriver } from '@objectstack/driver-redis';

const redis = new RedisDriver({
  host: 'localhost',
  port: 6379
});

await redis.connect();
await redis.set('key', 'value');
const value = await redis.get('key');
\`\`\`

## Caching Example

\`\`\`typescript
// Simple cache with TTL
await redis.setex('session:123', 3600, JSON.stringify(sessionData));

// Get cached data
const cached = await redis.get('session:123');
\`\`\`

## Pub/Sub

\`\`\`typescript
// Subscribe to channel
redis.subscribe('notifications', (message) => {
  console.log('Received:', message);
});

// Publish message
await redis.publish('notifications', 'Hello World');
\`\`\`

## License

MIT © ObjectStack Team
`
  },
  {
    id: 'driver-excel',
    name: 'driver-excel',
    version: '2.0.1',
    description: 'Parse and generate Excel files with ease. Support for XLSX, XLS, and CSV formats with advanced formatting options.',
    author: {
      name: 'ObjectStack Team',
      avatar: '/avatars/objectstack.png',
      url: 'https://github.com/objectstack-ai'
    },
    type: 'driver',
    stats: {
      downloads: 28450,
      stars: 512
    },
    tags: ['excel', 'spreadsheet', 'csv', 'data-import', 'export'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-ai/driver-excel',
    lastUpdated: '2024-01-18',
    isOfficial: true,
    isTrending: true,
    icon: '📊',
    readme: `# Excel Driver for ObjectStack

Read, write, and manipulate Excel files with a simple, intuitive API.

## Features

- ✅ Read/Write XLSX, XLS, CSV
- ✅ Cell formatting and styling
- ✅ Formula support
- ✅ Charts and images
- ✅ Large file streaming

## Installation

\`\`\`bash
ostack add driver-excel
\`\`\`

## Quick Start

\`\`\`typescript
import { ExcelDriver } from '@objectstack/driver-excel';

const excel = new ExcelDriver();

// Read Excel file
const workbook = await excel.read('data.xlsx');
const sheet = workbook.getSheet('Sheet1');
const data = sheet.getData();

// Write Excel file
const newWorkbook = excel.createWorkbook();
const newSheet = newWorkbook.addSheet('Sales');
newSheet.setData([
  ['Product', 'Price', 'Quantity'],
  ['Widget', 29.99, 100],
  ['Gadget', 49.99, 50]
]);

await excel.write(newWorkbook, 'output.xlsx');
\`\`\`

## Advanced Features

### Formatting

\`\`\`typescript
sheet.getCell('A1').style = {
  font: { bold: true, size: 14 },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } }
};
\`\`\`

### Formulas

\`\`\`typescript
sheet.getCell('D2').value = { formula: '=B2*C2' };
\`\`\`

## License

MIT © ObjectStack Team
`
  },
  {
    id: 'driver-salesforce',
    name: 'driver-salesforce',
    version: '1.8.0',
    description: 'Connect to Salesforce CRM with OAuth support. Query, create, and update Salesforce objects seamlessly.',
    author: {
      name: 'ObjectStack Team',
      avatar: '/avatars/objectstack.png',
      url: 'https://github.com/objectstack-ai'
    },
    type: 'driver',
    stats: {
      downloads: 15680,
      stars: 423
    },
    tags: ['salesforce', 'crm', 'saas', 'oauth', 'enterprise'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-ai/driver-salesforce',
    lastUpdated: '2024-01-12',
    isOfficial: true,
    icon: '☁️',
    readme: `# Salesforce Driver for ObjectStack

Official Salesforce CRM integration with full API support.

## Features

- ✅ OAuth 2.0 authentication
- ✅ SOQL query support
- ✅ CRUD operations on all objects
- ✅ Bulk API support
- ✅ Metadata API access

## Installation

\`\`\`bash
ostack add driver-salesforce
\`\`\`

## Quick Start

\`\`\`typescript
import { SalesforceDriver } from '@objectstack/driver-salesforce';

const sf = new SalesforceDriver({
  clientId: process.env.SF_CLIENT_ID,
  clientSecret: process.env.SF_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
});

// Authenticate
await sf.authenticate();

// Query records
const accounts = await sf.query('SELECT Id, Name FROM Account LIMIT 10');

// Create record
const newContact = await sf.create('Contact', {
  FirstName: 'John',
  LastName: 'Doe',
  Email: 'john@example.com'
});

// Update record
await sf.update('Contact', contactId, {
  Phone: '555-1234'
});
\`\`\`

## Bulk Operations

\`\`\`typescript
// Insert multiple records efficiently
const jobs = await sf.bulk.insert('Account', [
  { Name: 'Company A' },
  { Name: 'Company B' },
  { Name: 'Company C' }
]);
\`\`\`

## License

MIT © ObjectStack Team
`
  },
  {
    id: 'plugin-auth',
    name: 'plugin-auth',
    version: '3.1.0',
    description: 'Complete authentication solution with JWT, OAuth, and multi-factor authentication support.',
    author: {
      name: 'Community Contributors',
      avatar: '/avatars/community.png',
      url: 'https://github.com/objectstack-community'
    },
    type: 'plugin',
    stats: {
      downloads: 52100,
      stars: 1203
    },
    tags: ['authentication', 'security', 'jwt', 'oauth', '2fa'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-community/plugin-auth',
    lastUpdated: '2024-01-14',
    icon: '🔐',
    readme: `# Authentication Plugin for ObjectStack

Production-ready authentication with multiple strategies.

## Features

- ✅ JWT tokens
- ✅ OAuth 2.0 (Google, GitHub, etc.)
- ✅ Multi-factor authentication
- ✅ Session management
- ✅ Password hashing

## Installation

\`\`\`bash
ostack add plugin-auth
\`\`\`

## License

MIT
`
  },
  {
    id: 'module-ui-kit',
    name: 'module-ui-kit',
    version: '2.3.5',
    description: 'Beautiful, accessible React components built on Tailwind CSS. Dark mode support included.',
    author: {
      name: 'UI Team',
      avatar: '/avatars/ui-team.png',
      url: 'https://github.com/objectstack-ui'
    },
    type: 'module',
    stats: {
      downloads: 18920,
      stars: 689
    },
    tags: ['ui', 'components', 'react', 'tailwind', 'design-system'],
    license: 'MIT',
    repository: 'https://github.com/objectstack-ui/module-ui-kit',
    lastUpdated: '2024-01-16',
    isTrending: true,
    icon: '🎨',
    readme: `# UI Kit Module for ObjectStack

A comprehensive UI component library.

## Features

- ✅ 50+ components
- ✅ Dark mode support
- ✅ Fully accessible
- ✅ Tailwind CSS
- ✅ TypeScript

## Installation

\`\`\`bash
ostack add module-ui-kit
\`\`\`

## License

MIT
`
  }
];

// Helper functions
export function getPackageById(id: string): RegistryPackage | undefined {
  return mockPackages.find(pkg => pkg.id === id);
}

export function getPackagesByType(type: PackageType): RegistryPackage[] {
  return mockPackages.filter(pkg => pkg.type === type);
}

export function getTrendingPackages(): RegistryPackage[] {
  return mockPackages.filter(pkg => pkg.isTrending);
}

export function getOfficialPackages(): RegistryPackage[] {
  return mockPackages.filter(pkg => pkg.isOfficial);
}

export function searchPackages(query: string): RegistryPackage[] {
  const lowerQuery = query.toLowerCase();
  return mockPackages.filter(pkg => 
    pkg.name.toLowerCase().includes(lowerQuery) ||
    pkg.description.toLowerCase().includes(lowerQuery) ||
    pkg.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getPackagesByTag(tag: string): RegistryPackage[] {
  return mockPackages.filter(pkg => 
    pkg.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Categories for the homepage
export const categories = [
  {
    id: 'databases',
    name: 'Databases',
    description: 'SQL and NoSQL database drivers',
    icon: '🗄️',
    tags: ['database', 'sql', 'nosql']
  },
  {
    id: 'saas',
    name: 'SaaS Integrations',
    description: 'Connect to popular SaaS platforms',
    icon: '☁️',
    tags: ['saas', 'crm', 'enterprise']
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Data processing and analytics tools',
    icon: '📊',
    tags: ['data-import', 'export', 'analytics']
  },
  {
    id: 'ui',
    name: 'UI Components',
    description: 'Pre-built UI components and design systems',
    icon: '🎨',
    tags: ['ui', 'components', 'design-system']
  },
  {
    id: 'security',
    name: 'Security & Auth',
    description: 'Authentication and security plugins',
    icon: '🔐',
    tags: ['authentication', 'security', 'oauth']
  },
  {
    id: 'cache',
    name: 'Caching',
    description: 'Cache and session storage solutions',
    icon: '⚡',
    tags: ['cache', 'redis', 'performance']
  }
];

export function getPackagesByCategory(categoryId: string): RegistryPackage[] {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  
  return mockPackages.filter(pkg =>
    pkg.tags.some(tag => category.tags.includes(tag))
  );
}
