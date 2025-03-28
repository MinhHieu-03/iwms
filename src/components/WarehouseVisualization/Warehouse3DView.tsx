
import React, { useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment, Center, Text } from "@react-three/drei";
import * as THREE from "three";
import { WarehouseSection } from "@/lib/mock-data";

interface ShelfProps {
  position: [number, number, number];
  size: [number, number, number];
  baseColor: string;
  shelfColor: string;
  isHighlighted: boolean;
  name: string;
  isOccupied: boolean;
}

const Shelf: React.FC<ShelfProps> = ({ 
  position, 
  size, 
  baseColor, 
  shelfColor, 
  isHighlighted, 
  name,
  isOccupied
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.scale.set(1.05, 1.05, 1.05);
    } else if (meshRef.current) {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [isHighlighted]);

  // Number of shelves in the rack (3 levels)
  const shelves = 3;
  const shelfThickness = 0.1;
  const shelfSpacing = (size[1] - (shelves * shelfThickness)) / (shelves - 1);

  return (
    <group name={name}>
      {/* Base structure */}
      <mesh
        ref={meshRef}
        position={position}
        castShadow
        receiveShadow
      >
        <boxGeometry args={size} />
        <meshPhysicalMaterial 
          color={isHighlighted ? "#FF6B6B" : baseColor}
          metalness={0.2}
          roughness={0.8}
          emissive={isHighlighted ? "#FF6B6B" : "#000000"} 
          emissiveIntensity={isHighlighted ? 0.5 : 0}
        />
      </mesh>

      {/* Individual shelves */}
      {[...Array(shelves)].map((_, i) => {
        const shelfY = position[1] - size[1]/2 + shelfThickness/2 + i * (shelfThickness + shelfSpacing);
        const boxColor = isOccupied && i === 1 ? "#9b87f5" : shelfColor;

        return (
          <mesh 
            key={`shelf-${i}`} 
            position={[position[0], shelfY, position[2]]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[size[0] - 0.05, shelfThickness, size[2] - 0.05]} />
            <meshStandardMaterial 
              color={boxColor} 
              metalness={0.2}
              roughness={0.8}
            />
            
            {/* Add boxes on middle shelf if occupied */}
            {isOccupied && i === 1 && (
              <mesh position={[0, shelfThickness/2 + 0.15, 0]} castShadow>
                <boxGeometry args={[size[0] * 0.6, 0.3, size[2] * 0.6]} />
                <meshStandardMaterial color="#1EAEDB" />
              </mesh>
            )}
          </mesh>
        );
      })}
      
      {/* Rack position identifier */}
      <Text
        position={[position[0], position[1] - size[1]/2 - 0.15, position[2]]}
        fontSize={0.2}
        color="#333333"
        anchorY="top"
      >
        {name.split("-")[2]}
      </Text>
    </group>
  );
};

const Floor: React.FC = () => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
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
  sections: WarehouseSection[];
  highlightedShelf: string | null;
}> = ({ sections, highlightedShelf }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Position camera to show all shelves clearly from above
    camera.position.set(10, 15, 25);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Calculate total width needed for all sections
  const totalSectionsWidth = sections.length * 15;
  const startX = -(totalSectionsWidth / 2) + 5;

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Floor />
      
      <Center>
        {sections.map((section, sectionIndex) => {
          // Position sections in a row, adjusting X coordinate
          const sectionOffsetX = startX + sectionIndex * 15;
          
          return (
            <group key={section.id} position={[sectionOffsetX, 0, 0]}>
              <Text
                position={[0, 2, -4]}
                fontSize={0.8}
                color="#333"
                anchorY="top"
                fontWeight="bold"
              >
                {section.name}
              </Text>

              {Array.from({ length: section.rows }).map((_, row) =>
                Array.from({ length: section.columns }).map((_, col) => {
                  const shelfId = `${section.id}-${row + 1}-${col + 1}`;
                  const occupancyFactor = section.occupancy / 100;
                  const isOccupied = Math.random() < occupancyFactor;
                  
                  return (
                    <Shelf
                      key={shelfId}
                      position={[col * 2 - (section.columns - 1), 0.5, row * 2 - (section.rows - 1)]}
                      size={[1.5, 1, 1.5]}
                      baseColor="#E5DEFF"
                      shelfColor="#C8C8C9" 
                      isHighlighted={highlightedShelf === shelfId}
                      isOccupied={isOccupied}
                      name={shelfId}
                    />
                  );
                })
              )}
            </group>
          );
        })}
      </Center>
      
      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={5}
        maxDistance={50}
      />
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
      <Canvas 
        shadows 
        gl={{ antialias: true }}
        camera={{ position: [0, 15, 25], fov: 60 }}
      >
        <WarehouseScene sections={sections} highlightedShelf={highlightedShelf} />
      </Canvas>
    </div>
  );
};

export default Warehouse3DView;
