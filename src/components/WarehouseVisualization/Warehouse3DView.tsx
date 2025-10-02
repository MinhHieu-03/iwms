
import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { useTranslation } from "react-i18next";
import { WarehouseArea, Rack } from "@/data/warehouseData";

interface RackMeshProps {
  rack: Rack;
  position: [number, number, number];
  size: [number, number, number];
  isHighlighted: boolean;
  isHovered: boolean;
  onClick: (rackId: string) => void;
  onHover: (rackId: string | null) => void;
}

const RackMesh: React.FC<RackMeshProps> = ({ 
  rack, 
  position, 
  size, 
  isHighlighted, 
  isHovered,
  onClick,
  onHover
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current && (isHighlighted || isHovered)) {
      meshRef.current.scale.set(1.05, 1.05, 1.05);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [isHighlighted, isHovered]);

  const getRackColor = (status: string) => {
    switch (status) {
      case 'occupied': return "#3B82F6";
      case 'empty': return "#9CA3AF";
      case 'maintenance': return "#EF4444";
      case 'reserved': return "#F59E0B";
      default: return "#9CA3AF";
    }
  };

  const highlightColor = isHighlighted ? "#FF6B6B" : isHovered ? "#FF9B9B" : getRackColor(rack.status);

  // Calculate number of levels based on rack capacity and current load
  const maxLevels = Math.max(3, Math.ceil(rack.capacity / 50)); // At least 3 levels
  const occupiedLevels = Math.ceil((rack.currentLoad / rack.capacity) * maxLevels);
  const levelHeight = 0.6;

  return (
    <group 
      name={rack.id} 
      position={position}
      onClick={() => onClick(rack.id)}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(rack.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Base platform */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshPhysicalMaterial 
          color="#888888"
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Vertical supports at corners */}
      {[
        [-size[0]/2 + 0.05, 0, -size[2]/2 + 0.05],
        [size[0]/2 - 0.05, 0, -size[2]/2 + 0.05],
        [-size[0]/2 + 0.05, 0, size[2]/2 - 0.05],
        [size[0]/2 - 0.05, 0, size[2]/2 - 0.05],
      ].map((pos, i) => (
        <mesh 
          key={`support-${i}`} 
          position={[pos[0], (maxLevels * levelHeight) / 2, pos[2]]}
          castShadow
        >
          <boxGeometry args={[0.08, maxLevels * levelHeight, 0.08]} />
          <meshStandardMaterial color={isHighlighted || isHovered ? "#FF9B9B" : "#666666"} />
        </mesh>
      ))}
      
      {/* Storage levels/blocks stacked in Z axis */}
      {[...Array(maxLevels)].map((_, i) => {
        const levelY = i * levelHeight;
        const isOccupied = i < occupiedLevels;
        
        return (
          <group key={`level-${i}`} position={[0, levelY, 0]}>
            {/* Level platform */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[size[0] - 0.1, 0.05, size[2] - 0.1]} />
              <meshStandardMaterial 
                color={isOccupied ? "#E5DEFF" : "#C8C8C9"} 
                metalness={0.2}
                roughness={0.8}
              />
            </mesh>
            
            {/* Storage blocks on occupied levels */}
            {isOccupied && (
              <mesh position={[0, 0.25, 0]} castShadow>
                <boxGeometry args={[size[0] * 0.8, 0.4, size[2] * 0.8]} />
                <meshStandardMaterial color={highlightColor} />
              </mesh>
            )}
          </group>
        );
      })}
      
      {/* Rack label */}
      <Text
        position={[0, -0.3, 0]}
        fontSize={0.2}
        color="#333333"
        anchorY="top"
      >
        {rack.locationCode}
      </Text>
    </group>
  );
};

const Floor: React.FC = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#f7fafc" roughness={0.8} metalness={0.2} />
      </mesh>
      <Grid 
        infiniteGrid
        cellSize={2}
        cellThickness={0.5}
        cellColor="#6E59A5"
        sectionSize={6}
        sectionThickness={1}
        sectionColor="#9b87f5"
        fadeDistance={100}
        fadeStrength={1.5}
      />
    </>
  );
};

const WarehouseScene: React.FC<{
  areas: WarehouseArea[];
  racks: Rack[];
  highlightedRack: string | null;
  hoveredRack: string | null;
  activeAreaId: string;
  onRackClick: (rackId: string) => void;
  onRackHover: (rackId: string | null) => void;
}> = ({ areas, racks, highlightedRack, hoveredRack, activeAreaId, onRackClick, onRackHover }) => {
  const { camera } = useThree();
const { t } = useTranslation();  
  useEffect(() => {
    camera.position.set(20, 20, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Show all racks in 3D view, but group them by area
  const rackLayout = useMemo(() => {
    const layout = new Map<string, [number, number, number]>();
    const areaPositions = new Map<string, { x: number, z: number }>();
    
    // Position areas in the warehouse
    areas.forEach((area, areaIndex) => {
      const areaX = (areaIndex % 3) * 15 - 15; // 3 areas per row
      const areaZ = Math.floor(areaIndex / 3) * 15 - 15;
      areaPositions.set(area.id, { x: areaX, z: areaZ });
    });
    
    racks.forEach(rack => {
      const areaPos = areaPositions.get(rack.areaId) || { x: 0, z: 0 };
      
      // Position racks within their area
      const x = areaPos.x + (rack.column - 1) * 2.5 - 5;
      const z = areaPos.z + (rack.row - 1) * 2.5 - 5;
      const y = 0;
      
      layout.set(rack.id, [x, y, z]);
    });
    
    return layout;
  }, [areas, racks]);

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[15, 25, 20]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <Floor />
      
      <Center>
        {/* Area labels */}
        {areas.map((area) => {
          const areaRacks = racks.filter(r => r.areaId === area.id);
          if (areaRacks.length === 0) return null;
          
          const areaIndex = areas.indexOf(area);
          const areaX = (areaIndex % 3) * 15 - 15;
          const areaZ = Math.floor(areaIndex / 3) * 15 - 15;
          
          return (
            <Text
              key={area.id}
              position={[areaX, 3, areaZ - 8]}
              fontSize={0.8}
              color={activeAreaId === area.id ? "#9b87f5" : "#666"}
              anchorY="top"
            >
              {area.name}
            </Text>
          );
        })}

        {/* Render all racks */}
        {racks.map((rack) => {
          const position = rackLayout.get(rack.id) || [0, 0, 0];
          
          return (
            <RackMesh
              key={rack.id}
              rack={rack}
              position={position}
              size={[1.5, 1, 1.5]}
              isHighlighted={highlightedRack === rack.id}
              isHovered={hoveredRack === rack.id}
              onClick={onRackClick}
              onHover={onRackHover}
            />
          );
        })}
      </Center>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={10}
        maxDistance={80}
      />
    </>
  );
};

interface Warehouse3DViewProps {
  areas: WarehouseArea[];
  racks: Rack[];
  highlightedRack: string | null;
  hoveredRack: string | null;
  activeAreaId: string;
  onRackClick: (rackId: string) => void;
  onRackHover: (rackId: string | null) => void;
}

const Warehouse3DView: React.FC<Warehouse3DViewProps> = ({ 
  areas, 
  racks, 
  highlightedRack, 
  hoveredRack, 
  activeAreaId, 
  onRackClick,
  onRackHover
}) => {
  return (
    <div className="h-full w-full">
      <Canvas 
        shadows 
        gl={{ antialias: true }}
        camera={{ position: [20, 20, 25], fov: 50 }}
      >
        <WarehouseScene 
          areas={areas}
          racks={racks}
          highlightedRack={highlightedRack}
          hoveredRack={hoveredRack}
          activeAreaId={activeAreaId}
          onRackClick={onRackClick}
          onRackHover={onRackHover}
        />
      </Canvas>
    </div>
  );
};

export default Warehouse3DView;
