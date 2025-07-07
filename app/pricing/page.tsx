import { PricingTable } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="p-4 flex items-center justify-center " >
      <PricingTable
        appearance={{
          variables: {
            colorPrimary: '#22c55e', // Tailwind green-500
            colorText: '#111827',    // Optional: Tailwind gray-900
          },
          elements: {
            button: {
              fontWeight: '600',
              borderRadius: '8px',
              padding: '12px 20px',
            },
            planCard: {
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          },
        }}
      />
    </main>
  )
}
