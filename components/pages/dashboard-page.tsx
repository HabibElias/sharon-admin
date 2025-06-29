"use client";

import {
  BookOpen,
  DollarSign,
  Users,
  TrendingUp,
  UserCheck,
  Calendar,
  CreditCard,
  Heart,
  MessageSquare,
  Clock,
  Zap,
  UserPlus,
  Send,
  Upload,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import useMembers from "@/hooks/use-members";
import { useMemo } from "react";
import useDonations from "@/hooks/use-donations";
import Donation from "@/models/Donation";
import useMessages from "@/hooks/use-messages";

const donationData = [
  { name: "One Time", value: 1200, fill: "#8884d8" },
  { name: "Monthly", value: 800, fill: "#82ca9d" },
  { name: "Yearly", value: 400, fill: "#ffc658" },
  { name: "Quarterly", value: 300, fill: "#ff7c7c" },
];

const memberChartConfig = {
  professional: {
    label: "Professional",
    color: "#0088FE",
  },
  support: {
    label: "Support",
    color: "#00C49F",
  },
  prayer: {
    label: "Prayer",
    color: "#FFBB28",
  },
  both: {
    label: "Both",
    color: "#FF8042",
  },
} satisfies ChartConfig;

const donationChartConfig = {
  oneTime: {
    label: "One Time",
    color: "#8884d8",
  },
  monthly: {
    label: "Monthly",
    color: "#82ca9d",
  },
  yearly: {
    label: "Yearly",
    color: "#ffc658",
  },
  quarterly: {
    label: "Quarterly",
    color: "#ff7c7c",
  },
} satisfies ChartConfig;

export function DashboardPage() {
  const { data: members, isLoading: memLoading } = useMembers();
  const { data: donations, isLoading: donLoading } = useDonations();
  const { data: messages, isLoading: mesLoading } = useMessages();

  const revenue = useMemo(
    () => donations?.reduce((sum, don) => sum + don.amount, 0),
    [donations]
  );

  const totalDonations = useMemo(
    () =>
      donations?.reduce(
        (sum: number, donation: Donation) => sum + donation.amount,
        0
      ) ?? 0,
    [donations]
  );

  const totalDonors = useMemo(
    () =>
      new Set(donations?.map((donation: Donation) => donation.fullName) ?? [])
        .size,
    [donations]
  );

  const memberData = useMemo(() => {
    if (!members) return [];
    const categories = [
      { category: "professional", color: "#0088FE" },
      { category: "other", color: "#FFBB28" },
      { category: "prayer", color: "#FF8042" },
      { category: "both", color: "#A259FF" },
      { category: "mixed", color: "#EC4899" },
    ];
    return categories.map(({ category, color }) => ({
      category,
      color,
      value: members.filter((m: any) => m.category === category).length,
    }));
  }, [members]);

  const totalMembers = memberData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMembers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">members</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Donation/Person
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(totalDonations / totalDonors).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">per person</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4">
        {/* Member Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Member Categories
            </CardTitle>
            <CardDescription>
              Distribution of members by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={memberChartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={memberData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {memberData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {memberData.map((item) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">
                    {item.category}:
                  </span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Donation Types Chart */}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid gap-4">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserPlus className="h-5 w-5" />
                <span className="text-xs">Add Member</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="text-xs">Record Donation</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Send className="h-5 w-5" />
                <span className="text-xs">Send Message</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Upload className="h-5 w-5" />
                <span className="text-xs">Upload Resource</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${revenue}</div>
            <p className="text-xs text-muted-foreground">money</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages?.length}</div>
            <p className="text-xs text-muted-foreground">messages</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
