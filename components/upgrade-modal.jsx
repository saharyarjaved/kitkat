"use client";

import React from "react";
import { X, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PricingTable } from "@clerk/nextjs";

export function UpgradeModal({ isOpen, onClose, restrictedTool, reason }) {
  const getToolName = (toolId) => {
    const toolNames = {
      background: "AI Background Tools",
      ai_extender: "AI Image Extender",
      ai_edit: "AI Editor",
    };
    return toolNames[toolId] || "Premium Feature";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-4xl bg-gradient-to-br from-red-950 via-red-900 to-red-800
        border border-red-500/30 max-h-[90vh] overflow-y-auto backdrop-blur-xl"
      >
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-red-400" />
            <DialogTitle className="text-2xl font-bold text-white">
              Upgrade to Pro
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Restriction Message */}
          {restrictedTool && (
            <Alert className="bg-red-500/10 border border-red-400/30">
              <Zap className="h-5 w-5 text-red-400" />
              <AlertDescription className="text-red-100/80">
                <div className="font-semibold text-red-400 mb-1">
                  {getToolName(restrictedTool)} – Pro Feature
                </div>
                {reason ||
                  `${getToolName(
                    restrictedTool
                  )} is only available on the Pro plan. Upgrade now to unlock this powerful feature and more.`}
              </AlertDescription>
            </Alert>
          )}

          {/* Clerk Pricing */}
          <div className="[&_.cl-card]:bg-white/5 [&_.cl-card]:border-red-500/20
                          [&_.cl-cardTitle]:text-white
                          [&_.cl-cardPrice]:text-red-400">
            <PricingTable />
          </div>
        </div>

        <DialogFooter className="justify-center">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-red-100/60 hover:text-white hover:bg-red-500/10"
          >
            Maybe Later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
