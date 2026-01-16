import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { ChartCard } from "../ChartCard";

const students = ["Alex T.", "Sarah J.", "Michael C.", "Emma W.", "James L."];
const coursework = ["Quiz 1", "Assignment 1", "Quiz 2", "Midterm", "Quiz 3", "Assignment 2"];

// Generate sample performance data (0-100 scale)
const performanceData = [
  [85, 78, 92, 88, 90, 82], // Alex
  [91, 88, 95, 92, 89, 94], // Sarah
  [72, 65, 70, 68, 75, 71], // Michael
  [78, 82, 80, 85, 83, 86], // Emma
  [88, 90, 86, 91, 89, 92], // James
];

export const StudentPerformanceHeatmap = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const getHeatmapColor = (score: number) => {
    if (score >= 90) return theme.palette.success.main;
    if (score >= 80) return alpha(theme.palette.success.main, 0.7);
    if (score >= 70) return theme.palette.warning.main;
    if (score >= 60) return alpha(theme.palette.warning.main, 0.7);
    return theme.palette.error.main;
  };

  const getTextColor = (score: number) => {
    if (score >= 70) return "#fff";
    return "#fff";
  };

  return (
    <ChartCard
      title="Student Performance Heatmap"
      subtitle="Scores across coursework (hover for details)"
      delay={delay}
    >
      <Box sx={{ overflowX: "auto" }}>
        {/* Header Row */}
        <Box sx={{ display: "flex", mb: 1, pl: 10 }}>
          {coursework.map((cw) => (
            <Box 
              key={cw}
              sx={{ 
                width: 64, 
                flexShrink: 0,
                textAlign: "center",
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 500,
                  color: "text.secondary",
                  fontSize: "0.65rem",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  height: 60,
                }}
              >
                {cw}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Data Rows */}
        {students.map((student, studentIndex) => (
          <Box 
            key={student}
            sx={{ 
              display: "flex", 
              alignItems: "center",
              mb: 0.75,
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                width: 80,
                fontWeight: 500,
                color: "text.secondary",
                flexShrink: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {student}
            </Typography>
            
            <Box sx={{ display: "flex", gap: 0.5 }}>
              {performanceData[studentIndex].map((score, cwIndex) => (
                <Tooltip 
                  key={cwIndex}
                  title={
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: "block" }}>
                        {students[studentIndex]}
                      </Typography>
                      <Typography variant="caption" sx={{ display: "block" }}>
                        {coursework[cwIndex]}: {score}%
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 36,
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: getHeatmapColor(score),
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                        boxShadow: theme.shadows[4],
                        zIndex: 1,
                      }
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 600,
                        color: getTextColor(score),
                        fontSize: "0.75rem",
                      }}
                    >
                      {score}
                    </Typography>
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        ))}

        {/* Legend */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: theme.palette.success.main }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>90+</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: alpha(theme.palette.success.main, 0.7) }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>80-89</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: theme.palette.warning.main }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>70-79</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: alpha(theme.palette.warning.main, 0.7) }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>60-69</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: 0.5, bgcolor: theme.palette.error.main }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>&lt;60</Typography>
          </Box>
        </Box>
      </Box>
    </ChartCard>
  );
};
