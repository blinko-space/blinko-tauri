import { Icon } from '@/components/Common/Iconify/icons';
import { motion } from "framer-motion";

// Tool icons mapping for different tools
export const toolIcons: Record<string, string> = {
  "search-blinko-tool": "material-symbols:search-rounded",
  "update-blinko-tool": "material-symbols:update",
  "upsert-blinko-tool": "material-symbols:add-circle-outline",
  "create-blinko-tool": "material-symbols:add-circle-outline",
  "jina-web-crawler-tool": "material-symbols:travel-explore",
  "web-search-tool": "material-symbols:travel-explore",
  // Add more tool mappings as needed
};

/**
 * Get the appropriate icon for a tool
 * @param toolName The name of the tool
 * @returns The icon name to use
 */
export const getToolIcon = (toolName: string): string => {
  // Extract the base name if it contains spaces or special formatting
  const baseName = toolName.toLowerCase().trim();
  
  // Try to find an exact match first
  if (toolIcons[baseName]) {
    return toolIcons[baseName];
  }
  
  // Try to find a partial match
  const partialMatch = Object.keys(toolIcons).find(key => baseName.includes(key));
  if (partialMatch && toolIcons[partialMatch]) {
    return toolIcons[partialMatch];
  }
  
  // Default icon if no match found
  return "material-symbols:build-circle";
};

/**
 * Convert a tool name to a human-readable display name
 * @param toolName The raw tool name
 * @returns Formatted display name
 */
export const getToolDisplayName = (toolName: string): string => {
  // Remove common suffixes and format nicely
  return toolName
    .replace(/-tool$/, '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/-/g, ' ')
    .trim();
};

/**
 * Component that displays a tool usage chip with animation
 */
export const ToolUsageChip = ({ 
  toolName, 
  index 
}: { 
  toolName: string, 
  index: number 
}): JSX.Element => {
  const displayName = getToolDisplayName(toolName);
  const icon = getToolIcon(toolName);
  
  return (
    <motion.div
      className="cursor-none inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-xl mr-2 mb-2 border border-primary/20 shadow-sm"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
    >
      {/* @ts-ignore */}
      <Icon icon={icon} className="text-primary" width="16" height="16" />
      <span className="text-xs font-medium">Using {displayName}</span>
    </motion.div>
  );
};
