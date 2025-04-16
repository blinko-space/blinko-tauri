/**
 * Compare two version strings (e.g. "1.2.3" and "1.3.0")
 * 
 * @param version1 First version string
 * @param version2 Second version string
 * @returns 
 *  - 1 if version1 > version2
 *  - 0 if version1 === version2
 *  - -1 if version1 < version2
 */
export function compareVersions(version1: string, version2: string): number {
  // Split versions by dots
  const v1Parts = version1.split('.').map(part => parseInt(part, 10) || 0);
  const v2Parts = version2.split('.').map(part => parseInt(part, 10) || 0);
  
  // Ensure both arrays have the same length
  const maxLength = Math.max(v1Parts.length, v2Parts.length);
  while (v1Parts.length < maxLength) v1Parts.push(0);
  while (v2Parts.length < maxLength) v2Parts.push(0);
  
  // Compare each segment
  for (let i = 0; i < maxLength; i++) {
    const v1 = v1Parts[i] || 0;
    const v2 = v2Parts[i] || 0;
    
    if (v1 > v2) return 1;
    if (v1 < v2) return -1;
  }
  
  // If we get here, the versions are equal
  return 0;
} 