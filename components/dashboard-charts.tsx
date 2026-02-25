"use client"

import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Line chart data - Member registration evolution over 12 months
interface MemberTrendData {
  month: string
  members: number
}

// Donut chart data - Distribution by activity type
interface ActivityDistributionData {
  name: string
  value: number
}

interface DashboardChartsProps {
  memberTrendData?: MemberTrendData[]
  activityDistributionData?: ActivityDistributionData[]
}

export function MembersLineChart({ data }: { data: MemberTrendData[] }) {
  const primaryColor = "oklch(0.55 0.16 250)" // Sky blue
  const accentColor = "oklch(0.62 0.18 130.64)" // Green accent

  return (
    <div className="bg-card rounded-lg shadow-md p-6 border border-border">
      <h3 className="text-xl font-bold mb-4">Évolution des Adhérents (12 derniers mois)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(200, 200, 200)" />
          <XAxis dataKey="month" stroke="rgb(100, 100, 100)" />
          <YAxis stroke="rgb(100, 100, 100)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="members"
            stroke="#2CA6C4"
            strokeWidth={3}
            dot={{ fill: "#2CA6C4", r: 5 }}
            activeDot={{ r: 7 }}
            name="Nombre d'adhérents"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ActivityDonutChart({ data }: { data: ActivityDistributionData[] }) {
  const colors = ["#2CA6C4", "#7DC857", "#E67E22", "#E74C3C", "#95A5A6"]

  return (
    <div className="bg-card rounded-lg shadow-md p-6 border border-border">
      <h3 className="text-xl font-bold mb-4">Répartition par Type d'Activité</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value} membres`}
            contentStyle={{
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DashboardCharts({ memberTrendData = [], activityDistributionData = [] }: DashboardChartsProps) {
  // Generate sample data if none provided
  const defaultMemberData: MemberTrendData[] =
    memberTrendData.length > 0
      ? memberTrendData
      : [
          { month: "Jan", members: 15 },
          { month: "Fév", members: 22 },
          { month: "Mar", members: 28 },
          { month: "Avr", members: 35 },
          { month: "Mai", members: 38 },
          { month: "Jun", members: 42 },
          { month: "Jul", members: 45 },
          { month: "Aoû", members: 48 },
          { month: "Sep", members: 52 },
          { month: "Oct", members: 55 },
          { month: "Nov", members: 58 },
          { month: "Déc", members: 62 },
        ]

  const defaultActivityData: ActivityDistributionData[] =
    activityDistributionData.length > 0
      ? activityDistributionData
      : [
          { name: "Football", value: 18 },
          { name: "Basketball", value: 14 },
          { name: "Volleyball", value: 12 },
          { name: "Athlétisme", value: 10 },
          { name: "Autres", value: 8 },
        ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <MembersLineChart data={defaultMemberData} />
      <ActivityDonutChart data={defaultActivityData} />
    </div>
  )
}
