
import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { useLanguage } from "@/contexts/LanguageContext";
import { WarehouseArea, Rack } from "@/data/warehouseData";

interface RackMeshProps {
  rack: Rack;
  position: [number, number, number];
  size: [number, number, number];
  isHighlighted: boolean;
  isHovered: boolean;
  onClick: (rackId: string) => void;
}

const RackMesh: React.FC<RackMeshProps> = ({ 
  rack, 
  position, 
  size, 
  isHighlighted, 
  isHovered,
  onClick
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

  // Number of shelves in the rack (3 levels)
  const shelves = 3;
  const shelfSpacing = 0.8;

  return (
    <group 
      name={rack.id} 
      position={position}
      onClick={() => onClick(rack.id)}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'default';
      }}
    >
      {/* Base frame */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[size[0], 0.05, size[2]]} />
        <meshPhysicalMaterial 
          color={highlightColor}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Vertical supports */}
      {[
        [-size[0]/2 + 0.05, 0, -size[2]/2 + 0.05],
        [size[0]/2 - 0.05, 0, -size[2]/2 + 0.05],
        [-size[0]/2 + 0.05, 0, size[2]/2 - 0.05],
        [size[0]/2 - 0.05, 0, size[2]/2 - 0.05],
      ].map((pos, i) => (
        <mesh 
          key={`support-${i}`} 
          position={[pos[0], (shelves * shelfSpacing) / 2, pos[2]]}
          castShadow
        >
          <boxGeometry args={[0.08, shelves * shelfSpacing, 0.08]} />
          <meshStandardMaterial color={isHighlighted || isHovered ? "#FF9B9B" : "#888888"} />
        </mesh>
      ))}
      
      {/* Individual shelves */}
      {[...Array(shelves)].map((_, i) => {
        const shelfY = i * shelfSpacing;
        const thisShelfOccupied = rack.status === 'occupied' && (i < Math.ceil(rack.currentLoad / rack.capacity * shelves));
        
        return (
          <group key={`shelf-${i}`} position={[0, shelfY, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[size[0] - 0.1, 0.05, size[2] - 0.1]} />
              <meshStandardMaterial 
                color={thisShelfOccupied ? "#E5DEFF" : "#C8C8C9"} 
                metalness={0.2}
                roughness={0.8}
              />
            </mesh>
            
            {/* Add items on shelf if occupied */}
            {thisShelfOccupied && (
              <group>
                {i === 0 && (
                  <mesh position={[0, 0.25, 0]} castShadow>
                    <boxGeometry args={[size[0] * 0.7, 0.4, size[2] * 0.7]} />
                    <meshStandardMaterial color="#9b87f5" />
                  </mesh>
                )}
                {i === 1 && rack.currentLoad > rack.capacity * 0.5 && (
                  <>
                    <mesh position={[-size[0]/4, 0.15, 0]} castShadow>
                      <boxGeometry args={[size[0] * 0.3, 0.25, size[2] * 0.5]} />
                      <meshStandardMaterial color="#1EAEDB" />
                    </mesh>
                    <mesh position={[size[0]/4, 0.2, 0]} castShadow>
                      <boxGeometry args={[size[0] * 0.3, 0.3, size[2] * 0.6]} />
                      <meshStandardMaterial color="#E67E22" />
                    </mesh>
                  </>
                )}
              </group>
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#f7fafc" roughness={0.8} metalness={0.2} />
      </mesh>
      <Grid 
        infiniteGrid
        cellSize={1}
        cellThickness={0.5}
        cellColor="#6E59A5"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#9b87f5"
        fadeDistance={50}
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
}> = ({ areas, racks, highlightedRack, hoveredRack, activeAreaId, onRackClick }) => {
  const { camera } = useThree();
  const { t } = useLanguage();
  
  useEffect(() => {
    camera.position.set(15, 15, 20);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Filter racks for active area or show all if no specific area
  const visibleRacks = useMemo(() => {
    return activeAreaId ? racks.filter(rack => rack.areaId === activeAreaId) : racks;
  }, [racks, activeAreaId]);

  // Calculate layout for racks
  const rackLayout = useMemo(() => {
    const layout = new Map<string, [number, number, number]>();
    
    if (visibleRacks.length === 0) return layout;

    // Group racks by row and column for better positioning
    const maxRow = Math.max(...visibleRacks.map(r => r.row));
    const maxCol = Math.max(...visibleRacks.map(r => r.column));
    
    visibleRacks.forEach(rack => {
      const x = (rack.column - 1) * 2.5 - (maxCol - 1) * 1.25;
      const z = (rack.row - 1) * 2.5 - (maxRow - 1) * 1.25;
      const y = 0;
      
      layout.set(rack.id, [x, y, z]);
    });
    
    return layout;
  }, [visibleRacks]);

  const activeArea = areas.find(area => area.id === activeAreaId);

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 15]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <Floor />
      
      <Center>
        {activeArea && (
          <Text
            position={[0, 4, -8]}
            fontSize={1}
            color="#333"
            anchorY="top"
          >
            {activeArea.name}
          </Text>
        )}

        {visibleRacks.map((rack) => {
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
        minDistance={8}
        maxDistance={50}
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
}

const Warehouse3DView: React.FC<Warehouse3DViewProps> = ({ 
  areas, 
  racks, 
  highlightedRack, 
  hoveredRack, 
  activeAreaId, 
  onRackClick 
}) => {
  return (
    <div className="h-full w-full">
      <Canvas 
        shadows 
        gl={{ antialias: true }}
        camera={{ position: [15, 15, 20], fov: 50 }}
      >
        <WarehouseScene 
          areas={areas}
          racks={racks}
          highlightedRack={highlightedRack}
          hoveredRack={hoveredRack}
          activeAreaId={activeAreaId}
          onRackClick={onRackClick}
        />
      </Canvas>
    </div>
  );
};

export default Warehouse3DView;
