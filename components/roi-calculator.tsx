"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Calculator, DollarSign, Clock, TrendingUp, Users } from "lucide-react"

interface ROICalculatorProps {
  className?: string
}

export function ROICalculator({ className }: ROICalculatorProps) {
  const [employees, setEmployees] = useState([5])
  const [hoursPerWeek, setHoursPerWeek] = useState([10])
  const [hourlyRate, setHourlyRate] = useState(25)
  const [automationCost, setAutomationCost] = useState(2500)
  const [results, setResults] = useState({
    weeklyWaste: 0,
    monthlyWaste: 0,
    yearlyWaste: 0,
    paybackPeriod: 0,
    yearlyROI: 0,
    threYearSavings: 0,
  })

  useEffect(() => {
    const weeklyWaste = employees[0] * hoursPerWeek[0] * hourlyRate
    const monthlyWaste = weeklyWaste * 4.33
    const yearlyWaste = weeklyWaste * 52
    const paybackPeriod = automationCost / monthlyWaste
    const yearlyROI = ((yearlyWaste - automationCost) / automationCost) * 100
    const threYearSavings = (yearlyWaste * 3) - automationCost

    setResults({
      weeklyWaste,
      monthlyWaste,
      yearlyWaste,
      paybackPeriod,
      yearlyROI,
      threYearSavings,
    })
  }, [employees, hoursPerWeek, hourlyRate, automationCost])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(0)}%`
  }

  const formatMonths = (months: number) => {
    if (months < 1) return `${(months * 30).toFixed(0)} days`
    return `${months.toFixed(1)} months`
  }

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 border border-lime-400/20 rounded-full text-lime-400 text-sm font-medium mb-4">
          <Calculator className="w-4 h-4" />
          Free ROI Calculator
        </div>
        <h2 className="text-3xl font-bold mb-2">
          Calculate Your Automation Savings
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          See exactly how much time and money you could save with AI automation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-lime-400" />
              Your Current Situation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Employees: {employees[0]}
              </label>
              <Slider
                value={employees}
                onValueChange={setEmployees}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1</span>
                <span>50+</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hours Wasted Per Employee/Week: {hoursPerWeek[0]}
              </label>
              <Slider
                value={hoursPerWeek}
                onValueChange={setHoursPerWeek}
                max={40}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1 hour</span>
                <span>40+ hours</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Average Hourly Rate ($)
              </label>
              <Input
                type="number"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                placeholder="25"
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Automation Investment ($)
              </label>
              <Input
                type="number"
                value={automationCost}
                onChange={(e) => setAutomationCost(Number(e.target.value))}
                placeholder="2500"
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-lime-400/20 bg-gradient-to-br from-lime-400/5 to-emerald-400/5 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-lime-400" />
              Your Savings Potential
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-muted-foreground">Weekly Waste</span>
                </div>
                <div className="text-2xl font-bold text-orange-400">
                  {formatCurrency(results.weeklyWaste)}
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-muted-foreground">Monthly Waste</span>
                </div>
                <div className="text-2xl font-bold text-red-400">
                  {formatCurrency(results.monthlyWaste)}
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-lime-400" />
                  <span className="text-sm text-muted-foreground">Yearly Savings</span>
                </div>
                <div className="text-2xl font-bold text-lime-400">
                  {formatCurrency(results.yearlyWaste)}
                </div>
              </div>

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Payback Period</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {formatMonths(results.paybackPeriod)}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-lime-400/10 to-emerald-400/10 p-6 rounded-lg border border-lime-400/20">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">3-Year ROI</div>
                <div className="text-4xl font-bold text-lime-400 mb-2">
                  {formatPercentage(results.yearlyROI)}
                </div>
                <div className="text-lg text-emerald-400">
                  Total Savings: {formatCurrency(results.threYearSavings)}
                </div>
              </div>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-500 hover:to-emerald-500 text-gray-900 font-semibold py-3"
              onClick={() => {
                const element = document.getElementById('contact')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get Your Custom Automation Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          💡 Results are estimates based on typical automation scenarios. 
          Contact us for a detailed assessment of your specific needs.
        </p>
      </div>
    </div>
  )
}