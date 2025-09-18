import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cd916a2d/health", (c) => {
  return c.json({ status: "ok" });
});

// Patient data endpoints
app.post("/make-server-cd916a2d/patient-data", async (c) => {
  try {
    const data = await c.req.json();
    await kv.set(`patient:${data.id}`, JSON.stringify(data));
    return c.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error saving patient data:", error);
    return c.json({ error: "Failed to save patient data" }, 500);
  }
});

app.get("/make-server-cd916a2d/patient-data", async (c) => {
  try {
    const patientKeys = await kv.getByPrefix("patient:");
    const patients = patientKeys.map(item => JSON.parse(item.value));
    return c.json(patients);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return c.json({ error: "Failed to fetch patient data" }, 500);
  }
});

// Water quality data endpoints
app.post("/make-server-cd916a2d/water-quality-data", async (c) => {
  try {
    const data = await c.req.json();
    await kv.set(`water:${data.id}`, JSON.stringify(data));
    return c.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error saving water quality data:", error);
    return c.json({ error: "Failed to save water quality data" }, 500);
  }
});

app.get("/make-server-cd916a2d/water-quality-data", async (c) => {
  try {
    const waterKeys = await kv.getByPrefix("water:");
    const waterData = waterKeys.map(item => JSON.parse(item.value));
    return c.json(waterData);
  } catch (error) {
    console.error("Error fetching water quality data:", error);
    return c.json({ error: "Failed to fetch water quality data" }, 500);
  }
});

// Community members endpoints
app.post("/make-server-cd916a2d/community-members", async (c) => {
  try {
    const data = await c.req.json();
    await kv.set(`community:${data.id}`, JSON.stringify(data));
    return c.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Error saving community member data:", error);
    return c.json({ error: "Failed to save community member data" }, 500);
  }
});

app.get("/make-server-cd916a2d/community-members", async (c) => {
  try {
    const communityKeys = await kv.getByPrefix("community:");
    const communityData = communityKeys.map(item => JSON.parse(item.value));
    return c.json(communityData);
  } catch (error) {
    console.error("Error fetching community member data:", error);
    return c.json({ error: "Failed to fetch community member data" }, 500);
  }
});

// CSV Export endpoints
app.get("/make-server-cd916a2d/export-csv/:type", async (c) => {
  try {
    const type = c.req.param("type");
    let data = [];
    let filename = "";
    let headers = [];

    switch (type) {
      case "patient":
        const patientKeys = await kv.getByPrefix("patient:");
        data = patientKeys.map(item => JSON.parse(item.value));
        headers = ["ID", "Name", "Age", "Gender", "DOB", "Village", "District", "Symptoms", "Days of Symptoms", "Water Source", "Timestamp"];
        filename = "patient_data.csv";
        break;
      
      case "water":
        const waterKeys = await kv.getByPrefix("water:");
        data = waterKeys.map(item => JSON.parse(item.value));
        headers = ["ID", "Location", "Village", "District", "State", "Temperature", "Turbidity", "TDS Value", "pH Level", "Bacteria Count", "Timestamp"];
        filename = "water_quality_data.csv";
        break;
      
      case "community":
        const communityKeys = await kv.getByPrefix("community:");
        data = communityKeys.map(item => JSON.parse(item.value));
        headers = ["ID", "Name", "Role", "Village", "District", "Cases Updated", "Timestamp"];
        filename = "community_data.csv";
        break;
      
      default:
        return c.json({ error: "Invalid export type" }, 400);
    }

    const csvContent = convertToCSV(data, headers, type);
    
    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`
      }
    });
  } catch (error) {
    console.error("Error exporting CSV:", error);
    return c.json({ error: "Failed to export CSV" }, 500);
  }
});

// Helper function to convert data to CSV
function convertToCSV(data: any[], headers: string[], type: string): string {
  const csvRows = [];
  csvRows.push(headers.join(","));
  
  data.forEach(item => {
    const row = [];
    
    switch (type) {
      case "patient":
        row.push(
          `"${item.id}"`,
          `"${item.name}"`,
          `"${item.age}"`,
          `"${item.gender}"`,
          `"${item.dob}"`,
          `"${item.village}"`,
          `"${item.district}"`,
          `"${Array.isArray(item.symptoms) ? item.symptoms.join(';') : item.symptoms}"`,
          `"${item.daysOfSymptoms}"`,
          `"${item.primaryWaterSource || ''}"`,
          `"${new Date(item.timestamp).toISOString()}"`
        );
        break;
      
      case "water":
        row.push(
          `"${item.id}"`,
          `"${item.location}"`,
          `"${item.village}"`,
          `"${item.district}"`,
          `"${item.state || ''}"`,
          `"${item.temperature || ''}"`,
          `"${item.turbidity || ''}"`,
          `"${item.tdsValue}"`,
          `"${item.phLevel}"`,
          `"${item.bacteriaCount}"`,
          `"${new Date(item.timestamp).toISOString()}"`
        );
        break;
      
      case "community":
        row.push(
          `"${item.id}"`,
          `"${item.name}"`,
          `"${item.role}"`,
          `"${item.village}"`,
          `"${item.district}"`,
          `"${item.casesUpdated}"`,
          `"${new Date(item.timestamp).toISOString()}"`
        );
        break;
    }
    
    csvRows.push(row.join(","));
  });
  
  return csvRows.join("\n");
}

Deno.serve(app.fetch);