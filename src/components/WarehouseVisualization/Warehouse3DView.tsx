
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { WarehouseSection } from "@/lib/mock-data";

interface ShelfProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  isHighlighted: boolean;
  name: string;
}

const Shelf: React.FC<ShelfProps> = ({ position, size, color, isHighlighted, name }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.scale.set(1.05, 1.05, 1.05);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [isHighlighted]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      name={name}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={isHighlighted ? "#ED8936" : color} 
        emissive={isHighlighted ? "#ED8936" : "#000000"} 
        emissiveIntensity={isHighlighted ? 0.5 : 0}
        roughness={0.7}
      />
    </mesh>
  );
};

const Floor: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#f7fafc" roughness={0.8} metalness={0.2} />
    </mesh>
  );
};

const WarehouseScene: React.FC<{
  sections: WarehouseSection[];
  highlightedShelf: string | null;
}> = ({ sections, highlightedShelf }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(15, 15, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Floor />
      {sections.map((section) => {
        const sectionOffsetX = parseInt(section.id.charCodeAt(0).toString()) * 10 - 65 * 10;
        
        return Array.from({ length: section.rows }).map((_, row) =>
          Array.from({ length: section.columns }).map((_, col) => {
            const shelfId = `${section.id}-${row + 1}-${col + 1}`;
            const occupancyFactor = section.occupancy / 100;
            const isOccupied = Math.random() < occupancyFactor;
            
            return (
              <Shelf
                key={shelfId}
                position={[sectionOffsetX + col * 1.2, 0, row * 1.2]}
                size={[1, 1, 1]}
                color={isOccupied ? "#2C7A7B" : "#CBD5E0"}
                isHighlighted={highlightedShelf === shelfId}
                name={shelfId}
              />
            );
          })
        );
      })}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </>
  );
};

interface Warehouse3DViewProps {
  sections: WarehouseSection[];
  highlightedShelf: string | null;
}

const Warehouse3DView: React.FC<Warehouse3DViewProps> = ({ sections, highlightedShelf }) => {
  return (
    <div className="h-full w-full">
      <Canvas shadows gl={{ antialias: true }} camera={{ position: [0, 0, 15], fov: 50 }}>
        <WarehouseScene sections={sections} highlightedShelf={highlightedShelf} />
      </Canvas>
    </div>
  );
};

export default Warehouse3DView;
