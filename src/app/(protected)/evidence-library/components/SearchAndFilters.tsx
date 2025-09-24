// src/app/(protected)/evidence-library/components/SearchAndFilters.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ArrowUpDown } from "lucide-react";

export function SearchAndFilters() {
  return (
    <section className="bg-white px-8 py-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              className="pl-10 pr-4" 
              placeholder="Search evidence..." 
            />
          </div>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="policy">Policy</SelectItem>
              <SelectItem value="risk-treatment">Risk Treatment</SelectItem>
              <SelectItem value="control">Control</SelectItem>
              <SelectItem value="training-log">Training Log</SelectItem>
              <SelectItem value="incident-record">Incident Record</SelectItem>
              <SelectItem value="audit-finding">Audit Finding</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="validated">Validated</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Owners" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="sarah">Sarah Johnson</SelectItem>
              <SelectItem value="mike">Mike Chen</SelectItem>
              <SelectItem value="lisa">Lisa Rodriguez</SelectItem>
              <SelectItem value="tom">Tom Wilson</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Showing 47 of 152 evidence items</span>
        <div className="flex items-center space-x-4">
          <span>Items per page:</span>
          <Select defaultValue="25">
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}